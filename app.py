from flask import Flask, abort, render_template, request, redirect, url_for, flash, session, send_file
from datetime import datetime, timedelta
from functools import wraps
import hmac
import os
import secrets
import hashlib
import sqlite3
import time
from pathlib import Path
from uuid import uuid4
from werkzeug.middleware.proxy_fix import ProxyFix
from backend import Admin, Customer
from notifications import send_email, send_reservation_notification, send_cancellation_notification
from product_info import PRODUCT_INFO


def load_local_environment():
    """Load unquoted KEY=value pairs from a local, git-ignored .env file."""
    environment_file = Path(__file__).with_name('.env')
    if not environment_file.exists():
        return
    for line in environment_file.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, value = line.split('=', 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_local_environment()

app = Flask(__name__)
production = os.getenv('APP_ENV', 'development').lower() == 'production'
secret_key = os.getenv('SECRET_KEY', '')
if production and (len(secret_key) < 32 or secret_key == 'development-only-secret-key'):
    raise RuntimeError('Production requires a unique SECRET_KEY of at least 32 characters.')
data_dir = Path(os.getenv('DATA_DIR', str(Path(app.root_path) / 'data')))
if production and (not data_dir.is_absolute() or os.getenv('DB_ENGINE', '').lower() != 'sqlite'):
    raise RuntimeError('Production requires an absolute persistent DATA_DIR and DB_ENGINE=sqlite.')
if production and data_dir.resolve().is_relative_to((Path(app.root_path) / 'static').resolve()):
    raise RuntimeError('DATA_DIR must be outside the public static directory.')
if production:
    os.environ['SQLITE_DATABASE'] = str(data_dir / 'xpharma.db')
    if os.getenv('TRUST_PROXY', '') == '1':
        app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)
app.secret_key = secret_key or 'development-only-secret-key'
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax',
    SESSION_COOKIE_SECURE=production,
    MAX_CONTENT_LENGTH=5 * 1024 * 1024,
    PAYMENT_PROOF_FOLDER=data_dir / 'payment_proofs',
)
app.config['PAYMENT_PROOF_FOLDER'].mkdir(parents=True, exist_ok=True)
ALLOWED_PAYMENT_PROOF_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}


def csrf_token():
    if '_csrf_token' not in session:
        session['_csrf_token'] = secrets.token_urlsafe(32)
    return session['_csrf_token']


@app.context_processor
def inject_csrf_token():
    return {'csrf_token': csrf_token(), 'current_year': datetime.now().year}


def validate_csrf():
    submitted_token = request.form.get('csrf_token', '')
    if not hmac.compare_digest(session.get('_csrf_token', ''), submitted_token):
        abort(400)


def save_payment_proof(upload):
    if not upload or not upload.filename:
        return None
    if '.' not in upload.filename:
        raise ValueError('Upload a PNG, JPG, JPEG, or WEBP payment screenshot.')
    extension = upload.filename.rsplit('.', 1)[1].lower()
    if extension not in ALLOWED_PAYMENT_PROOF_EXTENSIONS:
        raise ValueError('Upload a PNG, JPG, JPEG, or WEBP payment screenshot.')
    header = upload.stream.read(12)
    upload.stream.seek(0)
    valid_image = ((extension in {'jpg', 'jpeg'} and header.startswith(b'\xff\xd8\xff')) or
                   (extension == 'png' and header.startswith(b'\x89PNG\r\n\x1a\n')) or
                   (extension == 'webp' and header.startswith(b'RIFF') and header[8:12] == b'WEBP'))
    if not valid_image:
        raise ValueError('Upload a valid PNG, JPG, JPEG, or WEBP image.')
    filename = f"{uuid4().hex}.{extension}"
    upload.save(app.config['PAYMENT_PROOF_FOLDER'] / filename)
    return f"private/payment_proofs/{filename}"


@app.before_request
def block_legacy_public_proofs():
    if request.endpoint == 'static' and request.view_args.get('filename', '').replace('\\', '/').startswith('uploads/payment_proofs/'):
        abort(404)


@app.after_request
def add_security_headers(response):
    response.headers.setdefault('X-Content-Type-Options', 'nosniff')
    response.headers.setdefault('X-Frame-Options', 'SAMEORIGIN')
    response.headers.setdefault('Referrer-Policy', 'strict-origin-when-cross-origin')
    if request.path.startswith(('/admin/', '/customer/')):
        response.headers['Cache-Control'] = 'no-store'
    return response


@app.before_request
def limit_sensitive_requests():
    if not production or request.method != 'POST':
        return
    limits = {'admin_login': (10, 900), 'customer_login': (15, 900),
              'customer_register': (8, 3600), 'verify_account': (20, 900),
              'resend_verification': (5, 900)}
    if request.endpoint not in limits:
        return
    maximum, duration = limits[request.endpoint]
    bucket = hashlib.sha256(f"{request.endpoint}:{request.remote_addr}".encode()).hexdigest()
    # Initialise the database and share counters across worker processes.
    connection = Customer()
    connection.db.execute('BEGIN IMMEDIATE')
    try:
        now = time.time()
        connection.db.execute('DELETE FROM security_attempts WHERE window_start < ?', (now - 3600,))
        row = connection.db.execute('SELECT window_start, attempts FROM security_attempts WHERE bucket = ?', (bucket,)).fetchone()
        if not row or now - row['window_start'] >= duration:
            connection.db.execute('INSERT OR REPLACE INTO security_attempts (bucket, window_start, attempts) VALUES (?, ?, 1)', (bucket, now))
        elif row['attempts'] >= maximum:
            connection.db.commit()
            abort(429, description='Too many attempts. Please try again later.')
        else:
            connection.db.execute('UPDATE security_attempts SET attempts = attempts + 1 WHERE bucket = ?', (bucket,))
        connection.db.commit()
    except Exception:
        connection.db.rollback()
        raise


def deliver_verification_code(customer):
    message = f"Your XPharma verification code is {customer['code']}. It expires in 10 minutes."
    return send_email(customer['email'], 'Verify your XPharma account', message)


def admin_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if not session.get('admin'):
            return redirect(url_for('admin_login'))
        return view(*args, **kwargs)
    return wrapped_view


def customer_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if not session.get('customer_ssn'):
            return redirect(url_for('customer_login'))
        return view(*args, **kwargs)
    return wrapped_view


@app.template_filter('date_display')
def date_display(value):
    if hasattr(value, 'strftime'):
        return value.strftime('%Y-%m-%d')
    return str(value)[:10]

@app.route('/')
def index():
    customer = Customer()
    return render_template('index.html', products=customer.search_products(), product_info=PRODUCT_INFO)

@app.route('/about')
def about():
    return render_template('about.html')

# Admin routes
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        try:
            validate_csrf()
            email = request.form['email']
            password = request.form['password']
            
            admin = Admin()
            user, message = admin.admin_login(email, password)
            
            if user:
                session.pop('customer_ssn', None)
                session['admin'] = True
                session['admin_ssn'] = user['id']  
                session['admin_name'] = user['name']
                flash('Login successful', 'success')
                return redirect(url_for('admin_dashboard'))
            else:
                flash(message, 'danger')  
        except Exception:
            flash('An error occurred during login. Please try again.', 'danger')
    
    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin', None)
    session.pop('admin_ssn', None)
    session.pop('admin_name', None)
    return redirect(url_for('index'))

@app.route('/admin/dashboard')
@admin_required
def admin_dashboard():
    admin = Admin()
    stats = admin.get_product_statistics()
    return render_template('admin/dashboard.html', stats=stats)

@app.route('/admin/products/add', methods=['GET', 'POST'])
@admin_required
def add_product():
    if request.method == 'POST':
        try:
            validate_csrf()
            pack_size = int(request.form['pack_size'])
            current_year = 100000
            
            if pack_size < 1 or pack_size > current_year:
                flash(f'Please enter a valid pack size between 1 and {current_year}', 'danger')
                return render_template('admin/add_product.html')
                
            admin = Admin()
            result = admin.register_product(
                product_id=request.form['product_id'],
                product_name=request.form['product_name'],
                pack_size=pack_size,
                office_id=1,
                unit_price=float(request.form['unit_price'])
            )
            if result:
                flash('Product added successfully', 'success')
            else:
                flash('Could not add the product. Check that its reference is unique and the location exists.', 'danger')
            return redirect(url_for('admin_dashboard'))
        except ValueError:
            flash('Enter valid product details.', 'danger')
            return render_template('admin/add_product.html')
    return render_template('admin/add_product.html')

@app.route('/admin/reports')
@admin_required
def view_reports():
    # Get date range and filters from request arguments or use defaults
    default_start_date = datetime.now().replace(day=1).strftime('%Y-%m-%d')
    default_end_date = datetime.now().strftime('%Y-%m-%d')
    
    start_date = request.args.get('start_date', default_start_date)
    end_date = request.args.get('end_date', default_end_date)
    product_id = request.args.get('product_id', '')
    customer_ssn = request.args.get('customer_ssn', type=int)  # Convert to int if present

    # Convert string dates to datetime objects
    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')
        if start_date > end_date:
            raise ValueError
    except ValueError:
        flash('Choose a valid date range.', 'danger')
        return redirect(url_for('view_reports'))

    admin = Admin()
    
    # Get reports data with both product_id and customer_ssn filters
    reservations = admin.get_reservations_report(
        start_date=start_date,
        end_date=end_date,
        product_id=product_id if product_id else None,
        customer_ssn=customer_ssn if customer_ssn else None
    )
    return render_template(
        'admin/reports.html',
        reservations=reservations,
        default_start_date=default_start_date,
        default_end_date=default_end_date,
        selected_customer_ssn=customer_ssn
    )


@app.route('/admin/reservations/<int:reservation_id>/payment-proof')
@admin_required
def admin_payment_proof(reservation_id):
    admin = Admin()
    admin.cursor.execute('SELECT payment_proof FROM reservations WHERE reservation_id = %s', (reservation_id,))
    reservation = admin.cursor.fetchone()
    if not reservation or not reservation.get('payment_proof'):
        abort(404)
    stored = reservation['payment_proof'].replace('\\', '/')
    if stored.startswith('private/payment_proofs/'):
        directory = app.config['PAYMENT_PROOF_FOLDER']
    elif stored.startswith('uploads/payment_proofs/'):
        directory = Path(app.root_path) / 'static' / 'uploads' / 'payment_proofs'
    else:
        abort(404)
    filename = stored.rsplit('/', 1)[-1]
    if not filename or filename in {'.', '..'}:
        abort(404)
    path = directory / filename
    if not path.is_file():
        abort(404)
    response = send_file(path, as_attachment=True, download_name='payment-proof' + path.suffix.lower())
    response.headers['Cache-Control'] = 'no-store'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    return response

# Customer routes
@app.route('/customer/register', methods=['GET', 'POST'])
def customer_register():
    if request.method == 'POST':
        validate_csrf()
        customer = Customer()
        success, message = customer.register_customer(
            fname=request.form['fname'],
            lname=request.form['lname'],
            email=request.form['email'],
            password=request.form['password'],
            phone=request.form['phone'],
            city=request.form.get('city', ''),
            address=request.form.get('address', ''),
        )
        if success:
            pending, pending_message = customer.create_verification_code(request.form['email'])
            if not pending:
                flash(pending_message, 'danger')
                return redirect(url_for('customer_login'))
            delivered, delivery_message = deliver_verification_code(pending)
            session['pending_verification_ssn'] = pending['SSN']
            session['pending_verification_email'] = pending['email']
            if delivered:
                flash('A verification code was sent. Enter it to activate your account.', 'success')
            else:
                flash(f'Account created, but {delivery_message} Ask an administrator to configure the verification service, then resend the code.', 'warning')
            return redirect(url_for('verify_account'))
        flash(message, 'error')
    return render_template('customer/register.html')

@app.route('/customer/verify', methods=['GET', 'POST'])
def verify_account():
    customer_ssn = session.get('pending_verification_ssn')
    if not customer_ssn:
        return redirect(url_for('customer_login'))
    if request.method == 'POST':
        validate_csrf()
        customer = Customer()
        success, message = customer.verify_account(customer_ssn, request.form.get('code', '').strip())
        if success:
            session.pop('pending_verification_ssn', None)
            session.pop('pending_verification_email', None)
            session.pop('pending_verification_channel', None)
            session.pop('pending_verification_phone', None)
            flash(message, 'success')
            return redirect(url_for('customer_login'))
        flash(message, 'danger')
    return render_template('customer/verify.html', email=session.get('pending_verification_email'))

@app.route('/customer/verify/resend', methods=['POST'])
def resend_verification():
    validate_csrf()
    email = session.get('pending_verification_email')
    if not email:
        return redirect(url_for('customer_login'))
    customer = Customer()
    pending, message = customer.create_verification_code(email)
    if pending:
        delivered, delivery_message = deliver_verification_code(pending)
        flash('A new verification code was sent.' if delivered else delivery_message, 'success' if delivered else 'danger')
    else:
        flash(message, 'danger')
    return redirect(url_for('verify_account'))

@app.route('/customer/login', methods=['GET', 'POST'])
def customer_login():
    if request.method == 'POST':
        try:
            validate_csrf()
            email = request.form['email']
            password = request.form['password']
            
            customer = Customer()
            user, message = customer.login(email, password)
            
            if user:
                session.pop('admin', None)
                session.pop('admin_ssn', None)
                session.pop('admin_name', None)
                session['customer_ssn'] = user['SSN']
                flash('Login successful', 'success')
                return redirect(url_for('customer_dashboard'))
            else:
                if message == 'Verify your account before signing in.':
                    pending, _ = customer.create_verification_code(email)
                    if pending:
                        delivered, delivery_message = deliver_verification_code(pending)
                        session['pending_verification_ssn'] = pending['SSN']
                        session['pending_verification_email'] = pending['email']
                        flash('A new verification code was sent.' if delivered else delivery_message, 'success' if delivered else 'danger')
                        return redirect(url_for('verify_account'))
                flash(message, 'error')
        except Exception:
            flash('An error occurred during login. Please try again.', 'error')
    
    return render_template('customer/login.html')

@app.route('/customer/logout')
def customer_logout():
    session.pop('customer_ssn', None)
    return redirect(url_for('index'))

@app.route('/customer/search')
def browse_products():
    customer = Customer()
    products = customer.search_products(
        max_price=request.args.get('max_price', type=float),
        product_name=request.args.get('product_name'),
        pack_size=request.args.get('pack_size', type=int)
    )
    return render_template('customer/search.html', products=products, product_info=PRODUCT_INFO)

@app.route('/customer/products/<product_id>')
def product_detail(product_id):
    customer = Customer()
    customer.cursor.execute("""SELECT c.*, c.stock_quantity - COALESCE((
        SELECT SUM(r.quantity) FROM reservations r
        WHERE r.product_id = c.product_id AND r.status = 'active'), 0) AS available_quantity
        FROM products c WHERE c.product_id = %s AND c.status = 'active'""", (product_id,))
    product = customer.cursor.fetchone()
    if not product:
        abort(404)
    return render_template('customer/product_detail.html', product=product, info=PRODUCT_INFO.get(product_id))

@app.route('/customer/reserve/<product_id>', methods=['GET', 'POST'])
@customer_required
def reserve_product(product_id):
    customer = Customer()
    product = customer.get_product_for_reservation(product_id)
    if not product:
        flash('This product is currently unavailable.', 'danger')
        return redirect(url_for('browse_products'))
    if request.method == 'POST':
        payment_proof = None
        try:
            validate_csrf()
            payment_method = request.form.get('payment_method', '')
            if payment_method == 'instapay':
                payment_proof = save_payment_proof(request.files.get('payment_proof'))
            pickup_date = datetime.strptime(request.form['pickup_date'], '%Y-%m-%d')
            result, message = customer.create_reservation(
                customer_ssn=session['customer_ssn'],
                product_id=product_id,
                pickup_date=pickup_date,
                collection_end_date=pickup_date + timedelta(days=1),
                quantity=int(request.form['quantity']),
                payment_method=payment_method,
                payment_proof=payment_proof,
            )
        except (KeyError, ValueError):
            if payment_proof:
                (app.config['PAYMENT_PROOF_FOLDER'] / Path(payment_proof).name).unlink(missing_ok=True)
            flash('Choose a valid collection date, quantity, and payment option.', 'danger')
            return redirect(url_for('reserve_product', product_id=product_id))
        if result:
            customer.cursor.execute("SELECT fname, lname, email, phone, city, address FROM customers WHERE SSN = %s", (session['customer_ssn'],))
            account = customer.cursor.fetchone()
            customer.cursor.execute("SELECT reservation_id, price FROM reservations WHERE customer_ssn = %s AND product_id = %s ORDER BY reservation_id DESC LIMIT 1", (session['customer_ssn'], product_id))
            reservation = customer.cursor.fetchone()
            notified, _ = send_reservation_notification({
                'customer_name': f"{account['fname']} {account['lname']}", 'customer_email': account['email'],
                'customer_phone': account['phone'], 'product_id': product_id, 'quantity': int(request.form['quantity']),
                'customer_city': account['city'], 'customer_address': account['address'],
                'pickup_date': request.form['pickup_date'], 'payment_method': payment_method,
                'total': reservation['price'],
            })
            flash(message, 'success')
            if not notified:
                app.logger.error('Reservation %s was saved but notification delivery failed.', reservation.get('reservation_id', 'unknown'))
                flash('Your reservation was saved, but the notification could not be sent. Please contact XPharma.', 'warning')
            return redirect(url_for('customer_dashboard'))
        else:
            if payment_proof:
                proof_path = app.config['PAYMENT_PROOF_FOLDER'] / Path(payment_proof).name
                if proof_path.exists():
                    proof_path.unlink()
            flash(message, 'danger')
    
    today = datetime.now().strftime('%Y-%m-%d')
    return render_template(
        'customer/reserve.html',
        product_id=product_id,
        today=today,
        product=product,
        instapay_account=os.getenv('INSTAPAY_ACCOUNT', 'youssefmohamed2531@instapay'),
    )

@app.route('/customer/reservation/cancel/<int:reservation_id>', methods=['POST'])
@customer_required
def cancel_reservation(reservation_id):
    validate_csrf()
    customer = Customer()
    customer.cursor.execute("""SELECT r.*, c.product_name, cu.fname, cu.lname, cu.email, cu.phone
                               FROM reservations r JOIN products c ON r.product_id = c.product_id
                               JOIN customers cu ON r.customer_ssn = cu.SSN
                               WHERE r.reservation_id = %s AND r.customer_ssn = %s""", (reservation_id, session['customer_ssn']))
    reservation = customer.cursor.fetchone()
    if customer.cancel_reservation(reservation_id, session['customer_ssn']):
        if reservation:
            notified, _ = send_cancellation_notification({
                'reservation_id': reservation_id,
                'customer_name': f"{reservation['fname']} {reservation['lname']}",
                'customer_email': reservation['email'], 'customer_phone': reservation['phone'],
                'product_name': reservation['product_name'], 'product_id': reservation['product_id'],
                'quantity': reservation['quantity'], 'pickup_date': reservation['pickup_date'],
                'payment_method': reservation['payment_method'],
            })
            if not notified:
                app.logger.error('Cancellation notification for reservation %s could not be sent.', reservation_id)
                flash('Your cancellation was saved, but the notification could not be sent. Please contact XPharma.', 'warning')
        flash('Reservation cancelled successfully', 'success')
    else:
        flash('Reservation could not be cancelled.', 'danger')
    return redirect(url_for('customer_dashboard'))

@app.route('/customer/dashboard')
@customer_required
def customer_dashboard():
    customer = Customer()
    reservations = customer.get_customer_reservations(session['customer_ssn'])
    return render_template('customer/dashboard.html', reservations=reservations)

if __name__ == '__main__':
    app.run(debug=not production)
