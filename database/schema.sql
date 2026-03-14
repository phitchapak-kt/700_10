SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;


    -- ตาราง  user
CREATE TABLE IF NOT EXISTS `users` (
  `id`        int(11)           NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255)      CHARACTER SET utf8 NOT NULL,
  `lastname`  varchar(255)      CHARACTER SET utf8 NOT NULL,
  `password`  varchar(255)      NOT NULL,
  `phone`     varchar(20)       NOT NULL,
  `createdAt` timestamp         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  


    ---  ตาราง listings  ประกาศขาย

CREATE TABLE IF NOT EXISTS `users` (
  `id`        int(11)           NOT NULL AUTO_INCREMENT,
  `title` varchar(255)      CHARACTER SET utf8 NOT NULL,
  `interests` text CHARACTER SET utf8 NOT NULL,
  `password`  varchar(255)      NOT NULL,
  `phone`     varchar(20)       NOT NULL,
  `createdAt` timestamp         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  

