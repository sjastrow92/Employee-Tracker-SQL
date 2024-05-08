-- Drop the database if it exists
DROP DATABASE IF EXISTS employees_db;

-- Create the new database
CREATE DATABASE employees_db;

-- Connect to the database
\c employees_db

-- TODO- write an SQL command to Create the department table
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- TODO- write an SQL command to Create the role table
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

-- TODO- write an SQL command to Create the employee table
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);
