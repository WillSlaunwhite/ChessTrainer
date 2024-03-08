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

SET SQL_MODE = ''; 
DROP USER IF EXISTS chesstrainer@localhost; 
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'; 
CREATE USER 'chesstrainer'@'localhost' IDENTIFIED BY 'Artemis5!'; 

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON chesstrainerdb.* TO 'chesstrainer'@'localhost';
-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `registration_date` DATETIME NOT NULL,
  `last_login` DATETIME NULL,
  `preferences` TEXT NULL,
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
  `moves_sequence` VARCHAR(1000) NOT NULL,
  `difficulty_level` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `variations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `variations`;

CREATE TABLE IF NOT EXISTS `variations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `moves_sequence` VARCHAR(1000) NOT NULL,
  `opening_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`opening_id`) REFERENCES `opening` (`id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `game`;

CREATE TABLE IF NOT EXISTS `game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `opening_id` INT NOT NULL,
  `moves` VARCHAR(10000) NOT NULL,
  `outcome` ENUM('win', 'loss', 'draw') NULL,
  `mistakes` INT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`opening_id`) REFERENCES `opening` (`id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `master_games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `master_games`;

CREATE TABLE IF NOT EXISTS `master_games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `opening_id` INT NOT NULL,
  `white` VARCHAR(255) NOT NULL,
  `black` VARCHAR(255) NOT NULL,
  `result` ENUM('1-0', '0-1', '1/2-1/2') NULL,
  `event` VARCHAR(255) NULL,
  `site` VARCHAR(255) NULL,
  `date` DATE NULL,
  `round` VARCHAR(45) NULL,
  `white_elo` INT NULL,
  `black_elo` INT NULL,
  `eco` VARCHAR(10) NULL,
  `moves` VARCHAR(10000) NOT NULL,
  PRIMARY KEY (`id`),
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


SET SQL_MODE=@OLD_SQL_MODE; 
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS; 
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS; 

INSERT INTO user(id, username, password, role, email, registration_date, last_login) VALUES (1, 'chess_user', '$2a$10$5C451TAuy.Dd/lx/QFnVsOwZ27/SbZTUH3IuNLy1ChQXMybJHMHa2', "user", "chess_user@chesstrainer.com", NOW(), NOW());

INSERT INTO opening(id, name, description, base_moves_sequence, difficulty_level) VALUES 
(1, 'Italian Game', 'The Italian Game begins with 1.e4 e5 2.Nf3 Nc6 3.Bc4, emphasizing rapid development, central control, and a Kingside presence.', '1.e4 e5 2.Nf3 Nc6 3.Bc4', 'Intermediate');

INSERT INTO variations(id, name, moves_sequence, opening_id) VALUES 
(1, 'Main Line', '', 1),
(2, 'Two Knights Defense', 'Nf6', 1),
(3, 'Hungarian Defense', 'Be7', 1);
