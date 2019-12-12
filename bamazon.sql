DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dress", "women's clothing", 60.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skirt", "women's clothing", 65.00, 180);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "women's clothing", 25.10, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sweater", "women's clothing", 40.25, 175);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "women's clothing", 55.00, 210);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jeans", "women's clothing", 30.25, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("necklace", "jewlery", 90.00, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bracelet", "jewlery", 80.00, 290);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("earrings", "jewlery", 75.00, 190);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rings", "jewlery", 85.00, 220);

