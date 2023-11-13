DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(60)
);