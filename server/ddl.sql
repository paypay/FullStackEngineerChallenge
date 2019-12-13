-- Adminer 4.7.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';

SET NAMES utf8mb4;

-- DROP DATABASE IF EXISTS `performance`;
CREATE DATABASE `performance` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `performance`;

-- DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `emp_id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(50) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- DROP TABLE IF EXISTS `performance_review`;
CREATE TABLE `performance_review` (
  `candidate` varchar(20) NOT NULL,
  `reviewer` varchar(20) NOT NULL,
  `points` int(11) NOT NULL,
  `comments` varchar(500) NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `created_datetime` timestamp NOT NULL,
  `last_updated_by` varchar(20) NOT NULL,
  `last_updated_datetime` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- DROP TABLE IF EXISTS `performance_review_assignment`;
CREATE TABLE `performance_review_assignment` (
  `candidate` varchar(20) NOT NULL,
  `reviewer` varchar(20) NOT NULL,
  `reviewed` int(11) NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `created_datetime` int(11) NOT NULL,
  `last_updated_by` varchar(20) NOT NULL,
  `last_updated_datetime` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `user_id` varchar(20) NOT NULL,
  `salt` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `hash` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `iteration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2019-12-12 12:13:21