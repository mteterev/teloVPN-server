create TABLE servers(
    server VARCHAR (50) PRIMARY KEY,
    cnt_users INTEGER,
    max_users INTEGER NOT NULL
);

create TABLE users(
    user_id INTEGER PRIMARY KEY,
    chat_id INTEGER NOT NULL,
    start_date TIMESTAMP NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'client', 'admin')),
    server VARCHAR (50),
    expiration_time TIMESTAMP,
    uuid UUID UNIQUE,
    FOREIGN KEY (server) REFERENCES servers
);

CREATE OR REPLACE FUNCTION update_cnt_users()
RETURNS TRIGGER AS $after_insert_update_cnt_users$
BEGIN
    UPDATE servers
    SET cnt_users = (
        SELECT COUNT(user_id)
        FROM users
        WHERE server = NEW.server
    )
    WHERE server = NEW.server;
    
    RETURN NEW;
END;
$after_insert_update_cnt_users$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_update_cnt_users
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION update_cnt_users();

