CREATE TABLE assistant_rate_limits (
  bucket TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  attempts INTEGER NOT NULL,
  blocked_until INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_assistant_rate_limits_window ON assistant_rate_limits(window_start);
