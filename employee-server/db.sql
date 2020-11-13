# ************************************************************
# Sequel Ace SQL dump
# Version 2104
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 5.7.31)
# Database: employee
# Generation Time: 2020-11-13 07:37:44 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table employee
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` bigint(20) unsigned NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`id`, `name`)
VALUES
	(105179869609998,'xiaomo'),
	(105201644535822,'hupeng'),
	(105201645781007,'houko'),
	(105201728684063,'test');

/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table employee_comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee_comment`;

CREATE TABLE `employee_comment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint(20) NOT NULL,
  `star` int(1) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `comment_by` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `employee_comment` WRITE;
/*!40000 ALTER TABLE `employee_comment` DISABLE KEYS */;

INSERT INTO `employee_comment` (`id`, `employee_id`, `star`, `content`, `comment_by`)
VALUES
	(105201308008454,105179868168194,5,'hahah','xiaomo'),
	(105201308729351,105179868168194,5,'lalala','houko'),
	(105201369743371,105179869216772,4,'h2llo','hoko'),
	(105201648992273,105179869609998,5,'good','houko'),
	(105201649385490,105201644535822,5,'nice','houko'),
	(105201659609107,105201645781007,5,'work hard','houko'),
	(105201670553622,105201645781007,5,'hahaha','houko'),
	(105201673175063,105201645781007,5,'a new comment from xiaomo','houko'),
	(105201674616857,105201674289176,5,'hahah\n','houko');

/*!40000 ALTER TABLE `employee_comment` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
