-- Initial Cloudflare D1 schema for the XPharma migration.
-- Existing local data is not imported automatically.
PRAGMA foreign_keys = ON;
CREATE TABLE offices (office_id INTEGER PRIMARY KEY, country TEXT NOT NULL, phone TEXT);
CREATE TABLE products (product_id TEXT PRIMARY KEY, product_name TEXT NOT NULL, pack_size INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'active', office_id INTEGER NOT NULL REFERENCES offices(office_id), unit_price REAL NOT NULL, stock_quantity INTEGER NOT NULL DEFAULT 50);
CREATE TABLE customers (SSN INTEGER PRIMARY KEY AUTOINCREMENT, fname TEXT NOT NULL, lname TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password BLOB NOT NULL, phone TEXT NOT NULL, is_verified INTEGER NOT NULL DEFAULT 0, verification_channel TEXT, city TEXT, address TEXT);
CREATE TABLE verification_codes (verification_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_ssn INTEGER NOT NULL REFERENCES customers(SSN) ON DELETE CASCADE, code_hash TEXT NOT NULL, channel TEXT NOT NULL, expires_at TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, used_at TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE security_attempts (bucket TEXT PRIMARY KEY, window_start REAL NOT NULL, attempts INTEGER NOT NULL);
CREATE TABLE reservations (reservation_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_ssn INTEGER NOT NULL REFERENCES customers(SSN), product_id TEXT NOT NULL REFERENCES products(product_id), reservation_date TEXT NOT NULL, pickup_date TEXT NOT NULL, collection_end_date TEXT NOT NULL, completed_at TEXT, cancellation_date TEXT, price REAL NOT NULL, status TEXT NOT NULL DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, quantity INTEGER NOT NULL DEFAULT 1, payment_method TEXT NOT NULL DEFAULT 'cash', payment_proof TEXT, payment_status TEXT NOT NULL DEFAULT 'pending');
CREATE TABLE admin (admin_ssn INTEGER PRIMARY KEY AUTOINCREMENT, fname TEXT NOT NULL, lname TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
CREATE TABLE payments (payment_id INTEGER PRIMARY KEY AUTOINCREMENT, reservation_id INTEGER NOT NULL REFERENCES reservations(reservation_id), amount REAL NOT NULL, payment_date TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX idx_reservations_customer ON reservations(customer_ssn, reservation_id);
CREATE INDEX idx_verification_customer ON verification_codes(customer_ssn, verification_id);
INSERT INTO offices VALUES (1, 'Egypt', '01007718313');
INSERT INTO products (product_id, product_name, pack_size, status, office_id, unit_price, stock_quantity) VALUES
 ('XPH-101','Blemease Cream',50,'active',1,145,30),
 ('XPH-204','Plantain Cream',50,'active',1,120,30),
 ('XPH-203','Plantain Cream',30,'active',1,95,0),
 ('XPH-312','Bronex Massage Gel',50,'active',1,95,25);
