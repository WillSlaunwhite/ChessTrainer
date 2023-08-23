-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema chesstrainerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `chesstrainerdb`;
CREATE SCHEMA IF NOT EXISTS `chesstrainerdb` DEFAULT CHARACTER SET utf8;
USE `chesstrainerdb`;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `registration_date` DATETIME NOT NULL,
  `last_login` DATETIME NULL,
  `preferences` TEXT NULL,  -- You might want to structure this further depending on requirements
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `opening`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opening`;

CREATE TABLE IF NOT EXISTS `opening` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `moves_sequence` TEXT NOT NULL,
  `difficulty_level` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `game`;

CREATE TABLE IF NOT EXISTS `game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `opening_id` INT NOT NULL,
  `moves` VARCHAR(255) NOT NULL,  -- Considering PGN format for the 10 moves
  `outcome` ENUM('win', 'loss', 'draw') NULL,
  `mistakes` INT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`opening_id`) REFERENCES `opening` (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `user_progress`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_progress`;

CREATE TABLE IF NOT EXISTS `userProgress` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `opening_id` INT NOT NULL,
  `times_practiced` INT NOT NULL DEFAULT 0,
  `average_mistakes` DECIMAL(5,2) NULL,
  `last_practiced` DATETIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`opening_id`) REFERENCES `opening` (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `leaderboard`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `leaderboard`;

CREATE TABLE IF NOT EXISTS `leaderboard` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  `ranking` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB;

  SET SQL_MODE = ''; 
  DROP USER IF EXISTS chesstrainer@localhost; 
  SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'; 
  CREATE USER 'chesstrainer'@'localhost' IDENTIFIED BY 'trainer'; 
    
  GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'chesstrainer'@'localhost'; 
    
  SET SQL_MODE=@OLD_SQL_MODE; 
  SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS; 
  SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS; 
