import base64
import gc
import io
import os
import re
import sqlite3
import tempfile
import unittest
from datetime import date, timedelta
from pathlib import Path
from unittest.mock import patch

os.environ['DB_ENGINE'] = 'sqlite'
os.environ['APP_ENV'] = 'development'
os.environ['SECRET_KEY'] = 'test-only-key'

import app as site
from backend import Customer, initialize_sqlite_database


class XPharmaTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(ignore_cleanup_errors=True)
        self.addCleanup(self.temp.cleanup)
        os.environ['SQLITE_DATABASE'] = str(Path(self.temp.name) / 'test.db')
        site.app.config.update(TESTING=True, PAYMENT_PROOF_FOLDER=Path(self.temp.name) / 'proofs')
        site.app.config['PAYMENT_PROOF_FOLDER'].mkdir()
        self.client = site.app.test_client()
        self.sent = []
        self.email = patch.object(site, 'send_email', side_effect=lambda to, subject, body: (self.sent.append(body) or (True, 'sent')))
        self.order = patch.object(site, 'send_reservation_notification', return_value=(True, 'sent'))
        self.cancel = patch.object(site, 'send_cancellation_notification', return_value=(True, 'sent'))
        for mock in (self.email, self.order, self.cancel):
            mock.start()
            self.addCleanup(mock.stop)

    def tearDown(self):
        del self.client
        gc.collect()

    def register_and_verify(self):
        self.client.get('/customer/register')
        with self.client.session_transaction() as session:
            token = session['_csrf_token']
        response = self.client.post('/customer/register', data={
            'csrf_token': token, 'fname': 'Test', 'lname': 'Customer',
            'email': 'test@example.test', 'password': 'TestPass123',
            'phone': '01007718313', 'city': 'Alexandria', 'address': '12 Example Street',
        })
        self.assertTrue(response.location.endswith('/customer/verify'))
        code = re.search(r'\b\d{6}\b', self.sent[-1]).group()
        self.client.post('/customer/verify', data={'csrf_token': token, 'code': code})
        response = self.client.post('/customer/login', data={
            'csrf_token': token, 'email': 'test@example.test', 'password': 'TestPass123',
        })
        self.assertTrue(response.location.endswith('/customer/dashboard'))
        return token

    def test_catalogue_and_product_pages(self):
        for path in ('/', '/about', '/customer/search', '/customer/products/XPH-101', '/customer/products/XPH-204'):
            self.assertEqual(self.client.get(path).status_code, 200, path)
        page = self.client.get('/customer/search?product_name=Blemease')
        self.assertIn(b'Blemease', page.data)
        self.assertNotIn(b'Plantain Cream', page.data)

    def test_registration_reservation_and_private_proof(self):
        token = self.register_and_verify()
        pickup = date.today() + timedelta(days=1)
        png = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/aYkAAAAASUVORK5CYII=')
        response = self.client.post('/customer/reserve/XPH-101', data={
            'csrf_token': token, 'pickup_date': pickup.isoformat(),
            'collection_end_date': (pickup + timedelta(days=1)).isoformat(), 'quantity': '2',
            'payment_method': 'instapay', 'payment_proof': (io.BytesIO(png), 'proof.png'),
        }, content_type='multipart/form-data')
        self.assertTrue(response.location.endswith('/customer/dashboard'))
        self.assertIn(b'Blemease Cream', self.client.get('/customer/dashboard').data)
        self.assertEqual(self.client.get('/admin/reservations/1/payment-proof').status_code, 302)
        self.assertEqual(self.client.get('/static/uploads/payment_proofs/proof.png').status_code, 404)
        with self.client.session_transaction() as session:
            session.clear()
            session['admin'] = True
        proof = self.client.get('/admin/reservations/1/payment-proof')
        self.assertEqual(proof.status_code, 200)
        self.assertEqual(proof.data, png)
        proof.close()
        self.assertIn(b'Download proof', self.client.get('/admin/reports?start_date=' + str(pickup) + '&end_date=' + str(pickup)).data)

    def test_admin_can_add_product(self):
        self.client.get('/')
        with self.client.session_transaction() as session:
            token = session['_csrf_token']
            session['admin'] = True
        response = self.client.post('/admin/products/add', data={
            'csrf_token': token, 'product_id': 'TEST-1', 'product_name': 'Test product',
            'pack_size': '50', 'unit_price': '25',
        })
        self.assertTrue(response.location.endswith('/admin/dashboard'))
        self.assertIn(b'Test product', self.client.get('/customer/search').data)

    def test_legacy_database_migration_preserves_data_and_backup(self):
        path = Path(self.temp.name) / 'old.db'
        db = sqlite3.connect(path)
        db.executescript('''
            CREATE TABLE offices (office_id INTEGER PRIMARY KEY, country TEXT, phone TEXT);
            INSERT INTO offices VALUES (1, 'Egypt', '01007718313');
            CREATE TABLE cars (plate_id TEXT PRIMARY KEY, model TEXT, year INTEGER, status TEXT, office_id INTEGER, price_per_day REAL, stock_quantity INTEGER);
            INSERT INTO cars VALUES ('CUSTOM-1', 'Existing product', 50, 'active', 1, 42, 7);
            CREATE TABLE customers (SSN INTEGER PRIMARY KEY, fname TEXT, lname TEXT, email TEXT, password TEXT, phone TEXT, is_verified INTEGER, verification_channel TEXT);
            INSERT INTO customers VALUES (1, 'Existing', 'Customer', 'existing@example.test', 'hash', '01007718313', 1, 'email');
            CREATE TABLE reservations (reservation_id INTEGER PRIMARY KEY, customer_ssn INTEGER, plate_id TEXT, reservation_date TEXT, pickup_date TEXT, return_date TEXT, actual_return_date TEXT, cancellation_date TEXT, price REAL, status TEXT, created_at TEXT, quantity INTEGER, payment_method TEXT, payment_proof TEXT, payment_status TEXT, FOREIGN KEY(plate_id) REFERENCES cars(plate_id));
            INSERT INTO reservations VALUES (1, 1, 'CUSTOM-1', '2026-01-01', '2026-01-02', '2026-01-03', NULL, NULL, 42, 'active', '2026-01-01', 1, 'cash', NULL, 'cash_on_collection');
        ''')
        initialize_sqlite_database(db)
        self.assertEqual(db.execute("SELECT product_name FROM products WHERE product_id='CUSTOM-1'").fetchone()[0], 'Existing product')
        self.assertEqual(db.execute('SELECT product_id FROM reservations WHERE reservation_id=1').fetchone()[0], 'CUSTOM-1')
        self.assertFalse(db.execute('PRAGMA foreign_key_check').fetchall())
        self.assertTrue(list(Path(self.temp.name).glob('old.before-xpharma-cleanup-*.db')))
        db.close()


if __name__ == '__main__':
    unittest.main()
