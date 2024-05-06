-- Drop the database if it exists
DROP DATABASE IF EXISTS employees;

-- Create the new database
CREATE DATABASE employees;

-- Connect to the database
\c employees

-- TODO- write an SQL command to Create the department table
CREATE TABLE department (
        id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- TODO- write an SQL command to Create the role table
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);

-- TODO- write an SQL command to Create the employee table
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);
