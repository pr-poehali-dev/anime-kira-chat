CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    provider VARCHAR(20) NOT NULL,
    provider_id VARCHAR(100) NOT NULL,
    username VARCHAR(100),
    display_name VARCHAR(100),
    avatar_url TEXT,
    email VARCHAR(200),
    session_token VARCHAR(255) UNIQUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    last_seen TIMESTAMP DEFAULT NOW(),
    UNIQUE(provider, provider_id)
);

CREATE INDEX IF NOT EXISTS idx_users_session ON users(session_token);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
