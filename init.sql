DROP TABLE IF EXISTS contact CASCADE;
CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    ip TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON contact (created_at);