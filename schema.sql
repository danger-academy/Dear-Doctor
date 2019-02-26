 DROP DATABASE IF EXISTS `deardoctor_db`;
 CREATE DATABASE `deardoctor_db`;

USE `deardoctor_db`;

  CREATE TABLE `users`
  	(
  		user_id INTEGER AUTO_INCREMENT UNIQUE,
  		email VARCHAR(150) UNIQUE,
  		firstName VARCHAR(50) ,
 		lastName VARCHAR(50) ,
 		password VARCHAR(255) ,
 		createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 		updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--  		-- heal_id INTEGER,
  		PRIMARY KEY(user_id)
--  		-- FOREIGN KEY(heal_id) REFERENCES patientInfo(heal_id)
  	);

CREATE TABLE `diary` 
(
	`id` INTEGER not null auto_increment PRIMARY KEY, 
    `symptom` JSON DEFAULT NULL, 
    `food` JSON DEFAULT NULL, 
    `drink` JSON DEFAULT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    `owner_id` INT,
    INDEX (owner_id),
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
    ) 
    ENGINE=InnoDB;
	
