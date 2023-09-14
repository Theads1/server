CREATE TABLE carts(
    cart_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) ,
    product_id INTEGER NOT NULL,
    product_quantity INTEGER NOT NULL
);