-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2021 at 10:38 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `employee`
--

-- --------------------------------------------------------

--
-- Table structure for table `archive`
--

CREATE TABLE IF NOT EXISTS `archive` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` bigint(20) DEFAULT NULL,
  `fromModel` varchar(255) DEFAULT NULL,
  `originalRecord` longtext,
  `originalRecordId` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE IF NOT EXISTS `review` (
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` double DEFAULT NULL,
  `fromUserId` double DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`createdAt`, `updatedAt`, `id`, `userId`, `fromUserId`, `comment`, `review`, `status`) VALUES
('1622047358718', '1622047358718', 5, 2, 3, 'This person needs a good applause for his dedication.', '5', 1),
('1622050496504', '1622050496504', 6, 2, 1, 'test', '3', 1),
('1622050711744', '1622050711744', 7, 3, 1, 'vvv', '4', 1),
('1622051293265', '1622051293265', 8, 7, 1, '', '', 0),
('1622051402345', '1622051402345', 9, 4, 1, '', '', 0),
('1622051469679', '1622051469679', 10, 5, 1, '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `age` int(20) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `userType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`createdAt`, `updatedAt`, `id`, `username`, `displayName`, `password`, `age`, `gender`, `department`, `address`, `userType`) VALUES
(NULL, NULL, 1, 'admin', 'Administrator', '827ccb0eea8a706c4c34a16891f84e7b', 30, 'male', 'owner', 'kochi', 'admin'),
(NULL, NULL, 2, 'vishnu', 'Vishnu S Babu', '827ccb0eea8a706c4c34a16891f84e7b', 28, 'male', 'Marketting', 'punalur', 'user'),
('1621701112193', '1621701112193', 3, 'abinhm', 'Abin HM', '827ccb0eea8a706c4c34a16891f84e7b', 25, 'male', 'business', 'bangalore', 'user'),
('1622048511846', '1622048511846', 4, 'johndoe', 'John Doe', 'e10adc3949ba59abbe56e057f20f883e', 22, 'male', 'Enterprise', 'London', 'user'),
('1622048678071', '1622048678071', 5, 'Krishnakumar', 'KKR', '827ccb0eea8a706c4c34a16891f84e7b', 56, 'male', 'Marketting', 'Ireland', 'user'),
('1622048851207', '1622048851207', 6, 'jk', 'Jack', 'e10adc3949ba59abbe56e057f20f883e', 26, 'male', 'marketting', 'ireland', 'user'),
('1622049118421', '1622049118421', 7, 'hungraydane', 'Hungry', '827ccb0eea8a706c4c34a16891f84e7b', 66, 'male', 'Enterprise', 'Jakarta', 'user'),
('1622061226363', '1622061226363', 8, 'dawnbos', 'Dawn', '827ccb0eea8a706c4c34a16891f84e7b', 56, 'male', 'operations', 'Tokyo', 'user');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
