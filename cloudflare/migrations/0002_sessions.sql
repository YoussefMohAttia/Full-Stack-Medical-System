CREATE TABLE web_sessions (
  id_hash TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX idx_web_sessions_expiry ON web_sessions(expires_at);
