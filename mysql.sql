-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

CREATE TABLE products (

  item_id INT NOT NULL AUTO_INCREMENT,
 
  product_name VARCHAR(30),
  
  department_name VARCHAR(30),

  price INTEGER(10),
  
  stock_quantity INTEGER(10),

  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("golf balls", "sports", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("golf clubs", "sports", 15, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lamp", "housing", 20, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candle", "housing", 5, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lawn mower", "landscape", 100, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "clothing", 12, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shovel", "landscape", 15, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "clothing", 8, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cups", "housing", 5, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("football", "sports", 7, 40);