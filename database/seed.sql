INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `phone`) VALUES
('สิริมา', 'ทามะ', 'ab@gmail.com', '123456', '0123854796'),
('สุขใจ', 'สุขดี','zz@gmail.com', '256927', '0123888797');

INSERT INTO `categories` (`name`) VALUES
('มือถือ'),
('เมาส์');


INSERT INTO `listings` (`title`,`description`,`price`,`category_id`,`type`,`status`,`user_id`) VALUES
('มือถือ รุ่น iPhone 15','สภาพดีใช้ได้ไม่ถึง 1 เดือน',20000,1,'SELL','ACTIVE',1),
('เมาส์ไร้สาย','ซื้อมาผิดสี อยากแลกเปลี่ยนเป็น สีดำ',200,2,'EXCHANGE','ACTIVE',2);


INSERT INTO `listing_images` (`listing_id`,`image_url`,`image_order`) VALUES
(1,'iphone.jpg',1),
(2,'mouse.jpg',1);


INSERT INTO `conversations` (`listing_id`,`buyer_id`,`seller_id`) VALUES
(1,2,1);

INSERT INTO `messages` (`conversation_id`,`sender_id`,`content`,`is_read`) VALUES
(1, 2, 'ยังขายอยู่ไหมครับ', FALSE);


INSERT INTO `saved_listings` (`user_id`,`listing_id`) VALUES
(1, 2);





