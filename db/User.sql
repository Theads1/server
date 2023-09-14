Create DATABASE sunlogin
--needs extensions
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT  uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username,email,password) VALUES ('demo', 'sundalandadmin@gmail.com', 'demo123' );


INSERT INTO users (username,email,password) VALUES ('rgeter23', 'rgeter23@gmail.com', 'rgeter123');