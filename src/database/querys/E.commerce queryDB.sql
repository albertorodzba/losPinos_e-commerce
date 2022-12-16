CREATE TABLE `User` (
  `id_user` varchar(10) UNIQUE PRIMARY KEY NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(16) NOT NULL,
  `is_enable` boolean NOT NULL DEFAULT true,
  `FK_role_id` int NOT NULL
);

CREATE TABLE `Customer` (
  `id_customer` varchar(10) UNIQUE PRIMARY KEY NOT NULL,
  `name` varchar(60) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `company_name` varchar(60) UNIQUE,
  `postal_code` varchar(5),
  `street` varchar(40),
  `dwelling_number` varchar(5),
  `between_street` varchar(80),
  `suburb` varchar(40),
  `city` varchar(35),
  `state` varchar(30),
  `rfc` varchar(13),
  `private_phonenumber` varchar(10),
  `company_phonenumber` varchar(10),
  `FK_id_user` varchar(10) NOT NULL
);

CREATE TABLE `Order` (
  `id_order` bigint UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `FK_id_customer` varchar(10) NOT NULL,
  `total` float NOT NULL,
  `ordered_at` datetime NOT NULL DEFAULT (now()),
  `FK_status` int NOT NULL
);

CREATE TABLE `Order_status` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `status` varchar(30) UNIQUE NOT NULL
);

CREATE TABLE `Product` (
  `id_product` varchar(10) UNIQUE PRIMARY KEY NOT NULL,
  `product_name` varchar(50) UNIQUE NOT NULL,
  `description` varchar(150),
  `image` varchar(200) NOT NULL,
  `cost` float NOT NULL
);

CREATE TABLE `Role` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role` varchar(30) UNIQUE NOT NULL
);

CREATE TABLE `Requisition` (
  `id` bigint UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `FK_id_product` varchar(10) NOT NULL,
  `FK_id_order` bigint NOT NULL,
  `amount` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now())
);

ALTER TABLE `User` ADD FOREIGN KEY (`FK_role_id`) REFERENCES `Role` (`id`);

ALTER TABLE `Customer` ADD FOREIGN KEY (`FK_id_user`) REFERENCES `User` (`id_user`);

ALTER TABLE `Order` ADD FOREIGN KEY (`FK_id_customer`) REFERENCES `Customer` (`id_customer`);

ALTER TABLE `Order` ADD FOREIGN KEY (`FK_status`) REFERENCES `Order_status` (`id`);

ALTER TABLE `Requisition` ADD FOREIGN KEY (`FK_id_product`) REFERENCES `Product` (`id_product`);

ALTER TABLE `Requisition` ADD FOREIGN KEY (`FK_id_order`) REFERENCES `Order` (`id_order`);

INSERT INTO Role VALUES (default, 'ADMIN');
INSERT INTO Role VALUES (default, 'CUSTOMER');
INSERT INTO User VALUES (default, 'mario@hotmail.com', '1234', default, 1);
