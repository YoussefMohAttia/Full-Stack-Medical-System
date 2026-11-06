CREATE TABLE discount_codes (
  code TEXT PRIMARY KEY,
  percent INTEGER NOT NULL CHECK(percent BETWEEN 1 AND 100),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE reservations ADD COLUMN subtotal REAL;
ALTER TABLE reservations ADD COLUMN discount_code TEXT;
ALTER TABLE reservations ADD COLUMN discount_percent INTEGER NOT NULL DEFAULT 0;
ALTER TABLE reservations ADD COLUMN discount_amount REAL NOT NULL DEFAULT 0;

INSERT INTO discount_codes (code, percent) VALUES
  ('XPH-25-B18ED432', 25),
  ('XPH-30-43D7DF91', 30),
  ('XPH-35-EFF19E41', 35),
  ('XPH-40-0909066B', 40);
