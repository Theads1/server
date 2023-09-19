CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255)NOT NULL,
    product_id INTEGER,
    quantity INTEGER,
    amount FLOAT NOT NULL,
    address TEXT NOT NULL,
    status TEXT
);