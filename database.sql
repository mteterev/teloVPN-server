create TABLE servers(
    server VARCHAR (50) PRIMARY KEY,
    cnt_users INTEGER,
    max_users INTEGER
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


