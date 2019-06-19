DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;


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
VALUES ("basketballs", "sports", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("golf clubs", "sports", 15, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lamp", "housing", 20, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("table", "housing", 5, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("weed wacker", "landscape", 100, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "clothing", 12, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shovel", "landscape", 15, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "clothing", 8, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dish", "housing", 5, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("football", "sports", 7, 40);