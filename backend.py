from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import os
from pathlib import Path
import sqlite3
import hmac
import re
import bcrypt
import hashlib
import secrets


class SQLiteCursor:
    """Small compatibility layer for the MySQL-style queries used by this app."""

    def __init__(self, cursor):
        self.cursor = cursor

    def execute(self, query, params=None):
        query = query.replace('%s', '?').replace('NOW()', 'CURRENT_TIMESTAMP')
        normalized_params = tuple(
            value.isoformat(sep=' ') if isinstance(value, datetime) else value
            for value in (params or ())
        )
        self.cursor.execute(query, normalized_params)
        return self

    def fetchone(self):
        row = self.cursor.fetchone()
        return dict(row) if row else None

    def fetchall(self):
        return [dict(row) for row in self.cursor.fetchall()]

    @property
    def lastrowid(self):
        return self.cursor.lastrowid

    def close(self):
        self.cursor.close()


def migrate_existing_catalogue(db):
    """Back up and rename the original catalogue without dropping customer records."""
    old_table = db.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name='cars'").fetchone()
    if not old_table:
        return
    if db.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name='products'").fetchone():
        raise RuntimeError('Both catalogue tables exist; stop and inspect the database before migrating.')
    database_path = db.execute('PRAGMA database_list').fetchone()[2]
    if database_path:
        path = Path(database_path)
        backup = path.with_name(f'{path.stem}.before-xpharma-cleanup-{secrets.token_hex(4)}.db')
        with sqlite3.connect(backup) as backup_db:
            db.backup(backup_db)
    db.execute('PRAGMA foreign_keys = ON')
    db.execute('BEGIN IMMEDIATE')
    try:
        db.execute('ALTER TABLE cars RENAME TO products')
        for old, new in [('plate_id', 'product_id'), ('model', 'product_name'),
                         ('year', 'pack_size'), ('price_per_day', 'unit_price')]:
            db.execute(f'ALTER TABLE products RENAME COLUMN {old} TO {new}')
        if db.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name='reservations'").fetchone():
            columns = {row[1] for row in db.execute('PRAGMA table_info(reservations)')}
            for old, new in [('plate_id', 'product_id'), ('return_date', 'collection_end_date'),
                             ('actual_return_date', 'completed_at')]:
                if old in columns:
                    db.execute(f'ALTER TABLE reservations RENAME COLUMN {old} TO {new}')
        if db.execute('PRAGMA foreign_key_check').fetchone():
            raise RuntimeError('Database migration failed the foreign-key check.')
        db.commit()
    except Exception:
        db.rollback()
        raise


def initialize_sqlite_database(db):
    migrate_existing_catalogue(db)
    db.executescript("""
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS offices (
            office_id INTEGER PRIMARY KEY AUTOINCREMENT,
            country TEXT NOT NULL,
            phone TEXT
        );
        CREATE TABLE IF NOT EXISTS products (
            product_id TEXT PRIMARY KEY,
            product_name TEXT NOT NULL,
            pack_size INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'active',
            office_id INTEGER NOT NULL,
            unit_price REAL NOT NULL,
            FOREIGN KEY (office_id) REFERENCES offices(office_id) ON DELETE RESTRICT
        );
        CREATE TABLE IF NOT EXISTS customers (
            SSN INTEGER PRIMARY KEY AUTOINCREMENT,
            fname TEXT NOT NULL,
            lname TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password BLOB NOT NULL,
            phone TEXT NOT NULL,
            is_verified INTEGER NOT NULL DEFAULT 0,
            verification_channel TEXT
        );
        CREATE TABLE IF NOT EXISTS verification_codes (
            verification_id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_ssn INTEGER NOT NULL,
            code_hash TEXT NOT NULL,
            channel TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            attempts INTEGER NOT NULL DEFAULT 0,
            used_at TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_ssn) REFERENCES customers(SSN) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS security_attempts (
            bucket TEXT PRIMARY KEY,
            window_start REAL NOT NULL,
            attempts INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS reservations (
            reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_ssn INTEGER NOT NULL,
            product_id TEXT NOT NULL,
            reservation_date TEXT NOT NULL,
            pickup_date TEXT NOT NULL,
            collection_end_date TEXT NOT NULL,
            completed_at TEXT,
            cancellation_date TEXT,
            price REAL NOT NULL,
            status TEXT NOT NULL DEFAULT 'active',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_ssn) REFERENCES customers(SSN) ON DELETE RESTRICT,
            FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
        );
        CREATE TABLE IF NOT EXISTS admin (
            admin_ssn INTEGER PRIMARY KEY AUTOINCREMENT,
            fname TEXT NOT NULL,
            lname TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS payments (
            payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            reservation_id INTEGER NOT NULL,
            amount REAL NOT NULL,
            payment_date TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id) ON DELETE RESTRICT
        );
    """)

    # Bring earlier XPharma databases up to the current schema.
    product_columns = {row[1] for row in db.execute("PRAGMA table_info(products)").fetchall()}
    reservation_columns = {row[1] for row in db.execute("PRAGMA table_info(reservations)").fetchall()}
    customer_columns = {row[1] for row in db.execute("PRAGMA table_info(customers)").fetchall()}
    if 'stock_quantity' not in product_columns:
        db.execute("ALTER TABLE products ADD COLUMN stock_quantity INTEGER NOT NULL DEFAULT 50")
    for column, definition in [
        ('quantity', 'INTEGER NOT NULL DEFAULT 1'),
        ('payment_method', "TEXT NOT NULL DEFAULT 'cash'"),
        ('payment_proof', 'TEXT'),
        ('payment_status', "TEXT NOT NULL DEFAULT 'pending'"),
    ]:
        if column not in reservation_columns:
            db.execute(f"ALTER TABLE reservations ADD COLUMN {column} {definition}")
    if 'is_verified' not in customer_columns:
        db.execute("ALTER TABLE customers ADD COLUMN is_verified INTEGER NOT NULL DEFAULT 0")
    if 'verification_channel' not in customer_columns:
        db.execute("ALTER TABLE customers ADD COLUMN verification_channel TEXT")
    if 'city' not in customer_columns:
        db.execute("ALTER TABLE customers ADD COLUMN city TEXT")
    if 'address' not in customer_columns:
        db.execute("ALTER TABLE customers ADD COLUMN address TEXT")

    db.executemany(
        "INSERT OR IGNORE INTO offices (office_id, country, phone) VALUES (?, ?, ?)",
        [(1, 'Egypt', '01007718313')],
    )
    db.executemany(
        """INSERT OR IGNORE INTO products
        (product_id, product_name, pack_size, status, office_id, unit_price, stock_quantity)
        VALUES (?, ?, ?, ?, ?, ?, ?)""",
        [
            ('XPH-101', 'Blemease Cream', 50, 'active', 1, 145.00, 30),
            ('XPH-204', 'Plantain Cream', 50, 'active', 1, 120.00, 30),
            ('XPH-203', 'Plantain Cream', 30, 'active', 1, 95.00, 0),
            ('XPH-312', 'Bronex Massage Gel', 50, 'active', 1, 95.00, 25),
        ],
    )
    # Apply the supplied price list once; do not reset admin edits or stock on every connection.
    db.execute("CREATE TABLE IF NOT EXISTS app_migrations (name TEXT PRIMARY KEY)")
    if not db.execute("SELECT 1 FROM app_migrations WHERE name = ?", ('xpharma_catalogue_2026',)).fetchone():
        db.execute("UPDATE products SET unit_price = 120 WHERE product_id = 'XPH-204' AND unit_price = 135")
        db.execute("UPDATE products SET product_name = 'Bronex Massage Gel', pack_size = 50, unit_price = 95 WHERE product_id = 'XPH-312' AND product_name = 'Bronx Massage Gel' AND unit_price = 120")
        db.execute("UPDATE products SET status = 'inactive' WHERE product_id = 'XPH-420' AND product_name = 'Daily Skin Care Essential'")
        db.execute("INSERT INTO app_migrations (name) VALUES (?)", ('xpharma_catalogue_2026',))
    # Old demo accounts are retained locally for compatibility, but never created in production.
    if os.getenv('APP_ENV', 'development').lower() != 'production':
        db.executemany(
            "INSERT OR IGNORE INTO admin (email, fname, lname, password) VALUES (?, ?, ?, ?)",
            [
                ('admin@example.com', 'Admin', 'User', 'adminpass123'),
                ('super@example.com', 'Super', 'Admin', 'superpass456'),
            ],
        )
    db.commit()

class XPharmaDatabase:
    def __init__(self):
        try:
            if os.getenv('DB_ENGINE', 'sqlite').lower() != 'sqlite':
                raise ValueError('XPharma requires DB_ENGINE=sqlite.')
            database_path = Path(os.getenv("SQLITE_DATABASE", "data/xpharma_local.db"))
            database_path.parent.mkdir(parents=True, exist_ok=True)
            self.db = sqlite3.connect(database_path)
            self.db.row_factory = sqlite3.Row
            initialize_sqlite_database(self.db)
            self.cursor = SQLiteCursor(self.db.cursor())
        except sqlite3.Error as e:
            print(f"Error connecting to database: {e}")
            raise







    def get_customer_reservations(self, customer_ssn: int) -> List[Dict]:
        try:
            query = """
            SELECT r.*, c.product_name, c.product_id, cu.*
            FROM reservations r
            JOIN products c ON r.product_id = c.product_id
            JOIN customers cu ON r.customer_ssn = cu.SSN
            WHERE r.customer_ssn = %s
            """
            self.cursor.execute(query, (customer_ssn,))
            return self.cursor.fetchall()
        except Exception as e:
            print(f"Error getting customer reservations: {e}")
            return []


    def __del__(self):
        if hasattr(self, 'cursor') and self.cursor:
            self.cursor.close()
        if hasattr(self, 'db') and self.db:
            self.db.close() 

class Admin(XPharmaDatabase):
    def __init__(self):
        super().__init__()

    def admin_login(self, email: str, password: str) -> Tuple[Optional[Dict], str]:
        try:
            # Query by email, then verify the password in Python.
            query = """
            SELECT admin_ssn, fname, lname, email, password
            FROM admin 
            WHERE email = %s
            """
            self.cursor.execute(query, (email,))
            admin = self.cursor.fetchone()

            if admin and self.verify_password(admin['password'], password):
                return {
                    'id': admin['admin_ssn'],  # Changed from 'id' to 'admin_ssn'
                    'email': admin['email'],
                    'name': f"{admin['fname']} {admin['lname']}"  # Combine first and last name
                }, "Login successful"
            return None, "Invalid email or password"
            
        except Exception as e:
            print(f"Admin login error: {e}")
            return None, f"Login failed: {str(e)}"

    @staticmethod
    def verify_password(stored_password, submitted_password: str) -> bool:
        if os.getenv('APP_ENV', 'development').lower() == 'production':
            if not isinstance(stored_password, str) or not stored_password.startswith('$2'):
                return False
            if submitted_password in {'adminpass123', 'superpass456'}:
                return False
        if isinstance(stored_password, str) and stored_password.startswith('$2'):
            return bcrypt.checkpw(submitted_password.encode('utf-8'), stored_password.encode('utf-8'))
        return hmac.compare_digest(str(stored_password), submitted_password)

    def validate_admin_input(self, email: str, password: str) -> Tuple[bool, str]:
        # Email validation
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            return False, "Invalid email format"
        
        # Password validation (stricter for admin)
        if len(password) < 10:
            return False, "Admin password must be at least 10 characters long"
        if not re.search(r'[A-Z]', password):
            return False, "Password must contain at least one uppercase letter"
        if not re.search(r'[a-z]', password):
            return False, "Password must contain at least one lowercase letter"
        if not re.search(r'[0-9]', password):
            return False, "Password must contain at least one number"
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            return False, "Password must contain at least one special character"
        
        return True, "Validation successful"

    def register_product(self, product_id: str, product_name: str, pack_size: int, office_id: int, 
                    unit_price: float) -> bool:
        try:
            query = """INSERT INTO products (product_id, product_name, pack_size, status, office_id, 
                    unit_price) VALUES (%s, %s, %s, 'active', %s, %s)"""
            self.cursor.execute(query, (product_id, product_name, pack_size, office_id, unit_price))
            self.db.commit()
            return True
        except Exception as e:
            print(f"Error registering product: {e}")
            return False


    def get_product_statistics(self) -> Dict:
        try:
            query = """
            SELECT 
                COUNT(*) as total_products,
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_products,
                (SELECT COUNT(*) FROM reservations WHERE status = 'active') as active_reservations
            FROM products
            """
            self.cursor.execute(query)
            return self.cursor.fetchone()
        except Exception as e:
            print(f"Error getting statistics: {e}")
            return {}





    def get_reservations_report(self, start_date: datetime, end_date: datetime, 
                              product_id: Optional[str] = None, 
                              customer_ssn: Optional[int] = None) -> List[Dict]:
        try:
            query = """
            SELECT r.*, c.product_name, c.pack_size, c.unit_price, c.product_id, 
                   cu.fname, cu.lname, cu.email, cu.phone, cu.SSN
            FROM reservations r
            JOIN products c ON r.product_id = c.product_id
            JOIN customers cu ON r.customer_ssn = cu.SSN
            WHERE r.pickup_date >= %s AND r.pickup_date < %s
            """
            params = [start_date, end_date + timedelta(days=1)]

            if product_id:
                query += " AND r.product_id = %s"
                params.append(product_id)
            
            if customer_ssn:
                query += " AND r.customer_ssn = %s"
                params.append(customer_ssn)

            query += " ORDER BY r.pickup_date DESC"
            
            self.cursor.execute(query, params)
            return self.cursor.fetchall()
        except Exception as e:
            print(f"Error getting reservations: {e}")
            return []

class Customer(XPharmaDatabase):
    def __init__(self):
        super().__init__()

    def validate_input(self, email: str, password: str, phone: str) -> Tuple[bool, str]:
        # Phone validation - stricter implementation
        phone = phone.strip()  # Remove any whitespace
        if not phone.isdigit():
            return False, "Phone number must contain only digits"
        if len(phone) != 11:
            return False, f"Phone number must be exactly 11 digits (got {len(phone)})"
            
        # Email validation
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            return False, "Invalid email format"
        
        # Password validation
        if len(password) < 8:
            return False, "Password must be at least 8 characters long"
        if not re.search(r'[A-Z]', password):
            return False, "Password must contain at least one uppercase letter"
        if not re.search(r'[a-z]', password):
            return False, "Password must contain at least one lowercase letter"
        if not re.search(r'[0-9]', password):
            return False, "Password must contain at least one number"
        
        return True, "Validation successful"

    def register_customer(self, fname: str, lname: str, email: str,
                         password: str, phone: str, city: str, address: str) -> Tuple[bool, str]:
        try:
            # Strip whitespace from phone number
            phone = phone.strip()
            
            # Input validation
            is_valid, message = self.validate_input(email, password, phone)
            if not is_valid:
                return False, message
            city, address = city.strip(), address.strip()
            if not city or not address or len(city) > 100 or len(address) > 500:
                return False, "Enter a valid city and full address."
            
            # Check if email already exists
            self.cursor.execute("SELECT email FROM customers WHERE email = %s", (email,))
            if self.cursor.fetchone():
                return False, "Email already registered"
            
            # Hash password
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
            
            query = """INSERT INTO customers (fname, lname, email, password, phone, city, address, is_verified, verification_channel)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, 0, %s)"""
            self.cursor.execute(query, (fname, lname, email, hashed_password, phone, city, address, 'email'))
            self.db.commit()
            return True, "Account created. Verify your code to sign in."
        except Exception as e:
            print(f"Error registering customer: {e}")
            return False, "Registration failed"
    
    def login(self, email: str, password: str) -> Tuple[Optional[Dict], str]:
        try:
            # First get the user by email only
            query = "SELECT * FROM customers WHERE email = %s"
            self.cursor.execute(query, (email,))
            user = self.cursor.fetchone()
            
            if not user:
                return None, "Invalid email or password"
            try:
                # Get the stored hashed password
                stored_password = user['password']
                
                # Ensure the stored password is in bytes
                if isinstance(stored_password, str):
                    stored_password = stored_password.encode('utf-8')
                
                # Compare the entered password with stored hash
                if bcrypt.checkpw(password.encode('utf-8'), stored_password):
                    if not user.get('is_verified'):
                        return None, "Verify your account before signing in."
                    return user, "Login successful"
                else:
                    return None, "Invalid email or password"
                    
            except Exception as e:
                print(f"Password verification error: {e}")
                return None, "Invalid password format"
                
        except Exception as e:
            print(f"Login error: {e}")
            return None, "Login failed"

    def get_product_for_reservation(self, product_id: str) -> Optional[Dict]:
        try:
            query = """SELECT c.*, c.stock_quantity - COALESCE((
                SELECT SUM(r.quantity) FROM reservations r
                WHERE r.product_id = c.product_id AND r.status = 'active'
            ), 0) AS available_quantity
            FROM products c WHERE c.product_id = %s AND c.status = 'active'"""
            self.cursor.execute(query, (product_id,))
            product = self.cursor.fetchone()
            return product
        except Exception as e:
            print(f"Product lookup error: {e}")
            return None

    def create_verification_code(self, email: str) -> Tuple[Optional[Dict], str]:
        try:
            self.cursor.execute("SELECT SSN, email, phone, is_verified, verification_channel FROM customers WHERE email = %s", (email,))
            customer = self.cursor.fetchone()
            if not customer:
                return None, "Account not found."
            if customer['is_verified']:
                return None, "This account is already verified."
            channel = 'email'
            code = f"{secrets.randbelow(1_000_000):06d}"
            code_hash = hashlib.sha256(code.encode()).hexdigest()
            self.cursor.execute("UPDATE verification_codes SET used_at = NOW() WHERE customer_ssn = %s AND used_at IS NULL", (customer['SSN'],))
            self.cursor.execute("""INSERT INTO verification_codes (customer_ssn, code_hash, channel, expires_at)
                                 VALUES (%s, %s, %s, %s)""", (customer['SSN'], code_hash, channel, datetime.now() + timedelta(minutes=10)))
            self.db.commit()
            customer['code'] = code
            customer['channel'] = channel
            return customer, "Verification code created."
        except Exception as e:
            self.db.rollback()
            print(f"Verification code error: {e}")
            return None, "Could not create a verification code."

    def verify_account(self, customer_ssn: int, submitted_code: str) -> Tuple[bool, str]:
        try:
            self.cursor.execute("""SELECT * FROM verification_codes WHERE customer_ssn = %s AND used_at IS NULL AND channel = 'email'
                                 ORDER BY verification_id DESC LIMIT 1""", (customer_ssn,))
            record = self.cursor.fetchone()
            if not record:
                return False, "Request a new verification code."
            if datetime.fromisoformat(str(record['expires_at'])) < datetime.now() or record['attempts'] >= 5:
                return False, "This code expired. Request a new one."
            if not hmac.compare_digest(record['code_hash'], hashlib.sha256(submitted_code.encode()).hexdigest()):
                self.cursor.execute("UPDATE verification_codes SET attempts = attempts + 1 WHERE verification_id = %s", (record['verification_id'],))
                self.db.commit()
                return False, "Incorrect verification code."
            self.cursor.execute("UPDATE verification_codes SET used_at = NOW() WHERE verification_id = %s", (record['verification_id'],))
            self.cursor.execute("UPDATE customers SET is_verified = 1 WHERE SSN = %s", (customer_ssn,))
            self.db.commit()
            return True, "Account verified. You can now sign in."
        except Exception as e:
            self.db.rollback()
            print(f"Verification error: {e}")
            return False, "We could not verify your account."

    def create_reservation(self, customer_ssn: int, product_id: str,
                         pickup_date: datetime, collection_end_date: datetime,
                         quantity: int, payment_method: str,
                         payment_proof: Optional[str] = None) -> Tuple[bool, str]:
        try:
            if pickup_date.date() < datetime.now().date() or quantity < 1:
                raise ValueError("Choose a valid collection date and quantity.")
            if payment_method not in {'cash', 'instapay'}:
                raise ValueError("Choose a payment method.")
            if payment_method == 'instapay' and not payment_proof:
                raise ValueError("Upload your InstaPay transaction screenshot.")

            query = "SELECT unit_price, stock_quantity FROM products WHERE product_id = %s AND status = 'active'"
            self.cursor.execute(query, (product_id,))
            product = self.cursor.fetchone()
            if not product:
                raise ValueError("This product is not currently available.")
            total_price = product['unit_price'] * quantity
            payment_status = 'pending_verification' if payment_method == 'instapay' else 'cash_on_collection'
            query = """INSERT INTO reservations (customer_ssn, product_id, reservation_date,
                    pickup_date, collection_end_date, price, status, quantity, payment_method,
                    payment_proof, payment_status)
                    VALUES (%s, %s, NOW(), %s, %s, %s, 'active', %s, %s, %s, %s)"""
            self.cursor.execute(query, (customer_ssn, product_id, pickup_date, collection_end_date,
                                        total_price, quantity, payment_method,
                                        payment_proof, payment_status))
            self.db.commit()
            return True, "Reservation submitted successfully."
        except ValueError as e:
            self.db.rollback()
            return False, str(e)
        except Exception as e:
            print(f"Error creating reservation: {e}")
            self.db.rollback()
            return False, "We could not create your reservation. Please try again."
    
    def search_products(self, office_id: Optional[int] = None, 
                            product_name: Optional[str] = None,
                            max_price: Optional[float] = None,
                            min_price: Optional[float] = None,
                            pack_size: Optional[int] = None) -> List[Dict]:
        try:
            query = """
            SELECT c.*, c.stock_quantity - COALESCE((
                SELECT SUM(r.quantity) FROM reservations r
                WHERE r.product_id = c.product_id AND r.status = 'active'
            ), 0) AS available_quantity
            FROM products c
            WHERE c.status = 'active'
            """
            params = []
            
            if office_id:
                query += "AND office_id = %s "
                params.append(office_id)
            if product_name:
                query += "AND LOWER(product_name) LIKE LOWER(%s) "
                params.append(f"%{product_name}%")
            if max_price:
                query += "AND unit_price <= %s "
                params.append(max_price)
            if min_price:
                query += "AND unit_price >= %s "
                params.append(min_price)
            if pack_size:
                query += "AND pack_size = %s "
                params.append(pack_size)

            self.cursor.execute(query, params)
            return self.cursor.fetchall()
        except Exception as e:
            print(f"Error searching products: {e}")
            return []



    def cancel_reservation(self, reservation_id: int, customer_ssn: int) -> bool:
        try:
            # Verify reservation exists and is active (not picked up or completed)
            query = """
            SELECT * FROM reservations 
            WHERE reservation_id = %s AND customer_ssn = %s AND status = 'active'
            """
            self.cursor.execute(query, (reservation_id, customer_ssn))
            reservation = self.cursor.fetchone()
            
            if not reservation:
                raise ValueError("Invalid reservation or cannot be cancelled (already picked up or completed)")

            # Update reservation status to cancelled
            query = """UPDATE reservations 
                      SET status = 'cancelled',
                          cancellation_date = NOW()
                      WHERE reservation_id = %s"""
            self.cursor.execute(query, (reservation_id,))
            
            self.db.commit()
            return True
        except Exception as e:
            print(f"Error cancelling reservation: {e}")
            self.db.rollback()
            return False
