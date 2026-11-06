CREATE TABLE reservation_proof_history (
  proof_id INTEGER PRIMARY KEY AUTOINCREMENT,
  reservation_id INTEGER NOT NULL REFERENCES reservations(reservation_id) ON DELETE RESTRICT,
  payment_proof TEXT NOT NULL,
  replaced_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_reservation_proof_history ON reservation_proof_history(reservation_id, proof_id DESC);
