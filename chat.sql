-- MySQL dump 10.13  Distrib 5.6.21, for osx10.8 (x86_64)
-- 
-- Host: localhost    Database : chatroom
-- ------------------------------------------------------
-- Server version	5.6.21


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
	

-- 
-- Table structure for table `tb_chat`
-- 
DROP TABLE IF EXISTS `tb_chat`;
CREATE TABLE `tb_chat` (
	`chat_id` bigint(20) NOT NULL AUTO_INCREMENT,
	`chat_name` varchar(20) DEFAULT NULL,
	`chat_content` varchar(40) DEFAULT NULL,
	`chat_time` datetime DEFAULT NULL,
	PRIMARY KEY(`chat_id`)
	) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
	
	
--
-- Create addChatInfo Procedure
--	
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addChatInfo`(
    IN p_name varchar(20),
    IN p_content varchar(128)
)
BEGIN
insert into tb_chat(chat_name, chat_content, chat_time)
values(p_name, p_content, NOW());
END ;;
DELIMITER ;


--
-- Create getChatInfo Procedure
--
DELIMITER ;;
CREATE DEFINER = `root`@`localhost` PROCEDURE `sp_getChatInfo`()
BEGIN
select chat_name,chat_content,chat_time from tb_chat;
END;;
DELIMITER ;
