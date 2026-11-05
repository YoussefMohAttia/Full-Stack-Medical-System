"""Create a production admin interactively without putting a password in source code."""
import getpass
import os
from pathlib import Path

import bcrypt

from backend import Admin


def main():
    if os.getenv('APP_ENV', '').lower() != 'production':
        raise SystemExit('Set APP_ENV=production before creating a production admin.')
    data_dir = Path(os.getenv('DATA_DIR', ''))
    if not data_dir.is_absolute() or os.getenv('DB_ENGINE', '').lower() != 'sqlite':
        raise SystemExit('Set DB_ENGINE=sqlite and DATA_DIR to the persistent disk path.')
    os.environ['SQLITE_DATABASE'] = str(data_dir / 'xpharma.db')
    email = input('Admin email: ').strip().lower()
    password = getpass.getpass('Admin password: ')
    if password != getpass.getpass('Confirm password: '):
        raise SystemExit('Passwords do not match.')
    admin = Admin()
    valid, reason = admin.validate_admin_input(email, password)
    if not valid:
        raise SystemExit(reason)
    if password in {'adminpass123', 'superpass456'}:
        raise SystemExit('Choose a unique password.')
    admin.cursor.execute('SELECT admin_ssn FROM admin WHERE email = %s', (email,))
    if admin.cursor.fetchone():
        raise SystemExit('This admin email already exists; no account was changed.')
    password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    admin.cursor.execute('INSERT INTO admin (fname, lname, email, password) VALUES (%s, %s, %s, %s)',
                         ('XPharma', 'Admin', email, password_hash))
    admin.db.commit()
    print('Admin created. Keep the password private.')


if __name__ == '__main__':
    main()
