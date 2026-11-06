CREATE TABLE admin_activity (activity_id INTEGER PRIMARY KEY AUTOINCREMENT, admin_ssn INTEGER NOT NULL REFERENCES admin(admin_ssn), reservation_id INTEGER REFERENCES reservations(reservation_id), product_id TEXT REFERENCES products(product_id), action TEXT NOT NULL, previous_value TEXT, new_value TEXT, note TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX idx_admin_activity_reservation ON admin_activity(reservation_id, activity_id DESC);
CREATE INDEX idx_admin_activity_product ON admin_activity(product_id, activity_id DESC);
