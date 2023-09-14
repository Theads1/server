CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    rating FLOAT NOT NULL
);


INSERT INTO products (title, price, description, category, img, rating) VALUES ('Luwint Children LED Finger Light Up Gloves - Amazing Colorful Glow Flashing Novelty Toys for Kids with Extra Batteries (Kids 5-12 Yrs Old)
', 11.69, 'GLOW IN THE DARK GLOVES FOR FUN AND SHOW,RELIABLE LIGHTING TECH & SOFT KNIT MATERIAL',
 'boys','https://m.media-amazon.com/images/I/61U5Rhwi6GL._AC_SX342_.jpg', 4.4) RETURNING *