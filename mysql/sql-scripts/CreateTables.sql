CREATE TABLE IF NOT EXISTS `paypay`.`admins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `fullname` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
  ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `paypay`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `fullname` VARCHAR(255) NOT NULL,
  `department` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
  ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `paypay`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `employee` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  CONSTRAINT fk_employees
  FOREIGN KEY (employee) 
    REFERENCES employees(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  PRIMARY KEY (`id`))
  ENGINE=InnoDB;
  
CREATE TABLE IF NOT EXISTS `paypay`.`feedbacks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `score` INT NOT NULL,
  `content` TEXT(1000) NOT NULL,
  `author` INT NOT NULL,
  `review` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  CONSTRAINT fk_author
  FOREIGN KEY (author) 
    REFERENCES employees(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT fk_review
  FOREIGN KEY (review) 
    REFERENCES reviews(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  PRIMARY KEY (`id`))
  ENGINE=InnoDB;  