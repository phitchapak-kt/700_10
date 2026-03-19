SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;


    -- ตาราง  user
    
CREATE TABLE IF NOT EXISTS `users` (
  `id`        int(11)           NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255)      CHARACTER SET utf8 NOT NULL,
  `lastname`  varchar(255)      CHARACTER SET utf8 NOT NULL,
  `email`       varchar(255)    NOT NULL UNIQUE,
  `password`  varchar(255)      NOT NULL,
  `phone`     varchar(20)       NOT NULL,
  `created_at` timestamp         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  


     -- ตาราง categories ประเภทสินค้า
     -- categories (1) ──< (many) listings
CREATE TABLE IF NOT EXISTS `categories` (
  `id`           int(11)           NOT NULL AUTO_INCREMENT,
  `name`         varchar(255)      CHARACTER SET utf8 NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  




    --  ตาราง listings  ประกาศขาย/ประเภทสินค้า
    
    --  users (1) ──< (many) listings 
    --  listings (1) ──< (many) saved_listings


CREATE TABLE IF NOT EXISTS `listings` (
  `id`              int(11)             NOT NULL AUTO_INCREMENT,
  `title`           varchar(255)        CHARACTER SET utf8 NOT NULL,
  `description`     text                CHARACTER SET utf8 NOT NULL,
  `price`           decimal(10,2)	    NOT NULL,
  `category_id`     int(11)             NOT NULL,
  `type`            enum('SELL','EXCHANGE')  NOT NULL,
  `status`          enum('ACTIVE','SOLD','CLOSED')   NOT NULL DEFAULT 'ACTIVE',   
  `user_id`          int(11)                       NOT NULL,
  `created_at`       timestamp           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  


-- ตาราง listing_images รูปภาพสินค้า
-- listings (1) ──< (many) listing_images

CREATE TABLE IF NOT EXISTS `listing_images` (
  `id`         int(11)      NOT NULL AUTO_INCREMENT,
  `listing_id` int(11)      NOT NULL,
  `image_url`  VARCHAR(255)   NOT NULL,
  `image_order`  int(11)      NOT NULL DEFAULT 0,
  `created_at` timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listing_id`) REFERENCES `listings`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


    -- ตาราง conversations / ช่องแชท
    --  users (1) ──< (many) conversations
    --  conversations (1) ──< (many) messages
    --  users (1) ──< (many) conversations (buyer)
    --  users (1) ──< (many) conversations (seller)


CREATE TABLE IF NOT EXISTS `conversations` (
  `id`              int(11)                 NOT NULL AUTO_INCREMENT,
  `listing_id`      int(11)                 NOT NULL,
  `buyer_id`        int(11)                 NOT NULL,      
  `seller_id`       int(11)                 NOT NULL,      
  `created_at`       timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listing_id`) REFERENCES `listings`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`seller_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  


        -- ตาราง messages / คุยข้อความ
        --  users (1) ──< (many) messages 

CREATE TABLE IF NOT EXISTS `messages` (
  `id`                   int(11)                  NOT NULL AUTO_INCREMENT,
  `conversation_id`      int(11)                  NOT NULL,
  `sender_id`            int(11)                  NOT NULL,
  `content`              text                     NOT NULL,
  `is_read`               boolean                  NOT NULL DEFAULT FALSE,   ////
  `created_at`           timestamp               NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  


    -- ตาราง saved_listings การบันทึกสิ่งของ  
    --  users (1) ──< (many) saved_listings
   

CREATE TABLE IF NOT EXISTS `saved_listings` (
  `id`                  int(11)                 NOT NULL AUTO_INCREMENT,
  `user_id`             int(11)                 NOT NULL,
  `listing_id`          int(11)                 NOT NULL,
  `created_at`           timestamp              NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`listing_id`) REFERENCES `listings`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  
 //เซฟแล้วกดดูได้ modele เรียกใช้
