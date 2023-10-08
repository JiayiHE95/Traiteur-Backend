DROP TABLE IF EXISTS `ordersystem`.`order_detail`;
DROP TABLE IF EXISTS `ordersystem`.`order`;
DROP TABLE IF EXISTS `ordersystem`.`cart_detail`;
DROP TABLE IF EXISTS `ordersystem`.`picture`;
DROP TABLE IF EXISTS `ordersystem`.`product`; 
DROP TABLE IF EXISTS `ordersystem`.`promo`;
DROP TABLE IF EXISTS `ordersystem`.`user`;

CREATE TABLE `ordersystem`.`user` (
  idUser INT PRIMARY KEY AUTO_INCREMENT,
  isAdmin BOOLEAN NOT NULL DEFAULT false,
  mail VARCHAR(255) NOT NULL,
  mdp VARCHAR(255) NOT NULL,
  reset_password_token VARCHAR(255),
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  adresse VARCHAR(255) ,
  cp VARCHAR(10) ,
  city VARCHAR(255) ,
  telephone VARCHAR(20),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  deletedAt datetime
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ordersystem`.`user` (isAdmin,mail,mdp,firstname,lastname,adresse,cp,city,telephone)VALUES(true,"jiayi.he@etu.umontpellier.fr","$2a$10$Ah3px4pJo5lvuw0GRvYkHeLNhNAplzD.Ar5/tO8WmCpmSlLJWNaLe","Jiayi","HE","polytech","34000", "Montpellier", "12345678");
INSERT INTO `ordersystem`.`user` (isAdmin,mail,mdp,firstname,lastname,adresse,cp,city,telephone)VALUES(false,"remi.jorge@etu.umontpellier.fr","$2a$10$ZUT5ZWH3iMVaOLZrAGb2MeQDDL85tkSEXfvTOvWRII/36OarE6DRy","Remi","JORGE","polytech","34000", "Montpellier", "12345678");


CREATE TABLE `ordersystem`.`product` (
  idProduct INT PRIMARY KEY AUTO_INCREMENT,
  category ENUM('ENTREE', 'PLAT', 'DESSERT'),
  nameProduct VARCHAR(255) NOT NULL,
  price float(8,2) NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  deletedAt datetime
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ordersystem`.`product` (category, nameProduct, price)
VALUES ('PLAT', 'Soupe Poulet Cepe', 12),
       ('PLAT', 'Riz Saute', 8),
       ('ENTREE', 'Salade Porc Concombre', 8),
       ('PLAT', 'Agneau 5 Epices', 16),
       ('PLAT', 'Melange Roti', 15),
       ('ENTREE', 'Crevettes Marinees', 9),
       ('DESSERT', 'Mangue Coco Bowl', 5),
       ('PLAT', 'Boeuf Tomates', 14),
       ('ENTREE', 'Saumon Marine', 10),
       ('PLAT', 'Porc Braise', 12),
       ('PLAT', 'Caille Frite', 6),
       ('PLAT', 'Lapin Caramel', 17),
       ('ENTREE', 'Salade Champignons', 6),
       ('PLAT', 'Saint Jacques', 4),
       ('PLAT', 'Fruits De Mer Frits', 14),
       ('PLAT', 'Poisson Sichuan', 18),
       ('DESSERT', 'Dessert Du Jour', 6);

CREATE TABLE `ordersystem`.`promo` (
  codePromo VARCHAR(255) PRIMARY KEY NOT NULL,
  percent float(3,2) NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  deletedAt datetime
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ordersystem`.`promo`(codePromo,percent) VALUES ("WELCOME",0.90);
INSERT INTO `ordersystem`.`promo`(codePromo,percent) VALUES ("COMPLET",0.85);

CREATE TABLE `ordersystem`.`picture` (
  idPicture INT PRIMARY KEY AUTO_INCREMENT,
  idProduct INT,
  namePicture VARCHAR(255),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  deletedAt datetime,
  CONSTRAINT FK_PRODUCT_PICTURE FOREIGN KEY (idProduct) REFERENCES product(idProduct)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(1,"001.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(2,"002.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(3,"003.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(4,"004.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(5,"005.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(6,"006.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(7,"007.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(8,"008.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(9,"009.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(10,"010.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(11,"011.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(12,"012.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(13,"013.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(14,"014.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(15,"015.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(16,"016.jpg");
INSERT INTO `ordersystem`.`picture` (idProduct,namePicture)VALUES(17,"017.jpg");

CREATE TABLE `ordersystem`.`order` (
  idOrder INT PRIMARY KEY AUTO_INCREMENT,
  idUser Integer NOT NULL,
  totalprice float(8,2) NOT NULL,
  discount float(8,2),
  paid float(8,2) NOT NULL,
  deliverydate datetime,
  /*orderstatus ENUM('CREEE', 'EN PREPARATION', 'LIVREE') DEFAULT 'CREEE',*/
  orderstatus VARCHAR(255) DEFAULT 'CREEE',
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  adresse VARCHAR(255) ,
  cp VARCHAR(10) ,
  city VARCHAR(255) ,
  telephone VARCHAR(20),
  mail VARCHAR(50),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  deletedAt datetime,
  CONSTRAINT FK_USER_ORDER FOREIGN KEY (idUser) REFERENCES user(idUser)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO ordersystem.order (idUser, totalprice, discount, paid, deliverydate, orderstatus, firstname, lastname, adresse, cp, city, telephone, mail) VALUES (1, 50.00, 5.00, 45.00, '2023-05-20 14:00:00', 'EN PREPARATION', 'John', 'Doe', '123 Main Street', '12345', 'Cityville', '123-456-7890', 'john.doe@example.com');

INSERT INTO ordersystem.order (idUser, totalprice, discount, paid, deliverydate, orderstatus, firstname, lastname, adresse, cp, city, telephone, mail) VALUES (1, 60.00, 0.00, 60.00, '2023-05-21 10:30:00', 'LIVREE', 'Jane', 'Smith', '456 Elm Street', '67890', 'Townsville', '987-654-3210', 'jane.smith@example.com');

INSERT INTO ordersystem.order (idUser, totalprice, discount, paid, deliverydate, orderstatus, firstname, lastname, adresse, cp, city, telephone, mail) VALUES (1, 75.00, 2.50, 72.50, '2023-05-22 16:45:00', 'EN PREPARATION', 'David', 'Johnson', '789 Oak Street', '13579', 'Villageville', '456-789-1230', 'david.johnson@example.com');

INSERT INTO ordersystem.order (idUser, totalprice, discount, paid, deliverydate, orderstatus, firstname, lastname, adresse, cp, city, telephone, mail) VALUES (1, 40.00, 0.00, 40.00, '2023-05-23 12:15:00', 'CREEE', 'Sarah', 'Williams', '321 Pine Street', '24680', 'Hamletville', '789-123-4560', 'sarah.williams@example.com');

CREATE TABLE `ordersystem`.`order_detail` (
  idOrder INT,
  idProduct Integer,
  quantity Integer NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  deletedAt datetime,
  CONSTRAINT PK_OD PRIMARY KEY(idOrder,idProduct),
  CONSTRAINT FK_ORDER_DETAIL FOREIGN KEY (idOrder) REFERENCES `order`(idOrder),
  CONSTRAINT FK_PRODUCT_DETAIL FOREIGN KEY (idProduct) REFERENCES product(idProduct)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ordersystem`.`cart_detail` (
  idUser INT,
  idProduct Integer,
  quantity Integer NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  deletedAt datetime,
  CONSTRAINT PK_CART PRIMARY KEY(idUser,idProduct),
  CONSTRAINT FK_USER_CART FOREIGN KEY (idUser) REFERENCES `user`(idUser),
  CONSTRAINT FK_PRODUCT_CART FOREIGN KEY (idProduct) REFERENCES product(idProduct)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
