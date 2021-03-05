CREATE DATABASE authtodo;

--users table
CREATE TABLE users (
    user_id UUID DEFAULT UUID_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

--todos table
CREATE TABLE todos(
    todo_id SERIAL,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--fake users data
INSERT INTO users (user_name, user_email, user_password) VALUES ('bruno', 'ezemba@gmail.com', 'vbvbvb');
INSERT INTO users (user_name, user_email, user_password) VALUES ('stella', 'stella@gmail.com', 'bnbnbn');

--fake todos data
INSERT INTO todos (user_id, description) VALUES ('38694bbe-3f65-4a9c-b03c-a8e6bbfbafb6', 'wash clothes');
INSERT INTO todos (user_id, description) VALUES ('eaf6cbd4-167c-4590-a954-f37f6c13be1a', 'cook food');

-- see all data where tables have relationships 
SELECT * FROM users INNER JOIN todos ON users.user_id = todos.user_id;

--get data from the LEFT WING table even though there's no relationship
SELECT * FROM users LEFT JOIN todos ON users.user_id = todos.user_id;

-- to get a particular user with his own todo when it eauals with the user_id
SELECT * FROM users LEFT JOIN todos on users.user_id = todos.user_id WHERE users.user_id = 'eaf6cbd4-167c-4590-a954-f37f6c13be1a';