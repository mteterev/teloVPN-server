create TABLE servers(
    server VARCHAR (50) PRIMARY KEY,
    url VARCHAR (50),
    cnt_users INTEGER,
    max_users INTEGER NOT NULL
);

create TABLE users(
    user_id INTEGER PRIMARY KEY,
    start_date TIMESTAMP NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'client', 'test')),
    server VARCHAR (50),
    expiration_time TIMESTAMP,
    subId varchar (50) UNIQUE,
    uuid UUID UNIQUE,
    username VARCHAR (50),
    refer INTEGER,
    promocode VARCHAR (50),
    FOREIGN KEY (server) REFERENCES servers
);

create TABLE prices(
    promocode VARCHAR (50) PRIMARY KEY,
    month1 INTEGER NOT NULL CHECK (month1 >= 100),
    month2 INTEGER NOT NULL CHECK (month1 >= 100),
    month3 INTEGER NOT NULL CHECK (month1 >= 100),
    month6 INTEGER NOT NULL CHECK (month1 >= 100),
    month12 INTEGER NOT NULL CHECK (month1 >= 100),
    end_date TIMESTAMP,
    validity INTEGER CHECK (validity > 0)
);

create TABLE admins(
    admin_id INTEGER
);

CREATE OR REPLACE FUNCTION update_cnt_users()
RETURNS TRIGGER AS $update_cnt_users$
BEGIN
    UPDATE servers AS s
        SET cnt_users = (
            SELECT COUNT(user_id)
            FROM users AS u
            WHERE u.server = s.server AND expiration_time > NOW() + INTERVAL '1 DAY'
        );
    RETURN NEW;
END;
$update_cnt_users$ LANGUAGE plpgsql;

CREATE TRIGGER update_cnt_users
AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION update_cnt_users();

SET TIME ZONE 'Europe/Moscow';


--INSERT INTO servers (server, url, cnt_users, max_users) VALUES ('NL01', 'http://213.183.61.244:34172', 0, 40);
--INSERT INTO prices (promocode, month1, month2, month3, month6, month12) VALUES ('base', 200, 400, 550, 900, 1800);
--INSERT INTO admins (admin_id) VALUES (203024910), (104115547);
