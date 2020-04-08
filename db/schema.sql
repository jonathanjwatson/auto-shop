DROP DATABASE IF EXISTS auto_shop_db;

CREATE DATABASE auto_shop_db;

USE auto_shop_db;

CREATE TABLE cars
(
	id int NOT NULL AUTO_INCREMENT,
	make varchar(30) NOT NULL,
    model varchar(30) NOT NULL,
    VIN varchar(100) NOT NULL,
    color varchar(30) NOT NULL,
    mileage integer(30) NOT NULL,
	PRIMARY KEY (id)
);