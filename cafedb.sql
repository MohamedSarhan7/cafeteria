CREATE DATABASE  IF NOT EXISTS `cafe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cafe`;
-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: cafe
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'water'),(2,'hot-drinks'),(3,'juice'),(4,'cold-drinks '),(5,'power-drinks'),(17,'abnasmnd'),(18,'sa,,m,m,'),(19,'dadsa,,m,m,'),(20,'mmm'),(21,'new category');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `notes` varchar(250) DEFAULT NULL,
  `room` int unsigned NOT NULL,
  `status` enum('done','out_for_delivery','canceled','proccessing') DEFAULT 'proccessing',
  `total_price` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,'note 1',4,'out_for_delivery',20,'2023-01-08 16:59:24'),(2,2,'note 1',4,'out_for_delivery',15,'2023-01-08 17:00:05'),(3,2,'note 1',4,'done',60,'2023-01-08 17:37:11'),(4,3,'note 1',4,'done',60,'2023-01-08 17:41:26'),(5,4,'note 1',4,'canceled',120,'2023-01-08 17:41:40'),(6,3,'note 1',4,'done',120,'2023-01-08 19:36:58'),(7,3,'note 1',4,'done',30,'2023-01-09 18:41:33'),(8,5,'note 1',4,'done',30,'2023-01-09 18:42:00'),(9,6,'note 1',4,'done',30,'2023-01-09 18:42:09'),(10,7,'note 1',4,'done',30,'2023-01-14 20:42:00'),(11,25,'note 1',5,'done',30,'2023-01-20 07:04:21'),(12,25,'note 1',5,'proccessing',30,'2023-01-20 07:04:32'),(13,25,'note 1',5,'done',140,'2023-01-20 13:55:07'),(14,34,'note 1',5,'done',140,'2023-01-20 13:56:12'),(15,2,'testting',22,'proccessing',160,'2023-01-20 15:44:34'),(16,2,'testting',22,'done',160,'2023-01-20 15:44:51'),(17,24,'hala',17,'canceled',180,'2023-01-20 18:40:49'),(18,24,'its my note',34,'proccessing',600,'2023-01-20 18:56:52'),(19,3,'7-1',6,'proccessing',15,'2023-01-20 18:58:48'),(20,24,'asdasd\'',17,'proccessing',120,'2023-01-20 19:06:31'),(21,24,'it\'s my note',17,'proccessing',160,'2023-01-20 19:06:58'),(22,2,'gfghg',1,'proccessing',90,'2023-01-20 20:20:40'),(23,7,'vcvc',6,'proccessing',40,'2023-01-20 20:34:34'),(24,31,'mmm',34,'proccessing',20,'2023-01-20 20:36:06'),(25,33,'mmm',49,'proccessing',20,'2023-01-20 20:36:35'),(26,24,'asd',17,'proccessing',15,'2023-01-20 20:37:30'),(27,25,'mm',18,'proccessing',50,'2023-01-20 20:38:35'),(28,4,'nbnnbn',2,'proccessing',5,'2023-01-20 20:43:18'),(29,2,'nnn',1,'proccessing',20,'2023-01-20 20:43:48'),(30,7,'',6,'done',35,'2023-01-21 21:20:35'),(31,34,'cvvcx',47,'done',43,'2023-01-21 22:04:05'),(32,24,'',17,'proccessing',94,'2023-01-21 22:06:57'),(33,2,'',1,'canceled',50,'2023-01-21 22:10:58'),(34,2,'',1,'proccessing',10,'2023-01-21 22:14:18'),(35,31,'',50,'proccessing',160,'2023-01-22 07:02:14'),(36,6,'',5,'proccessing',20,'2023-01-22 10:32:48'),(37,30,'',17,'out_for_delivery',50,'2023-01-22 10:33:07'),(38,7,'note',49,'proccessing',100,'2023-01-22 10:35:23'),(39,24,'',17,'proccessing',50,'2023-01-22 10:45:53'),(40,35,'nbnb',34,'canceled',140,'2023-01-22 10:49:29'),(41,35,'',35,'proccessing',36,'2023-01-22 10:49:51'),(42,24,'',17,'proccessing',140,'2023-01-23 03:53:08'),(43,36,'',36,'canceled',146,'2023-01-23 15:44:57'),(44,36,'',34,'done',24,'2023-01-01 15:45:57'),(45,36,'',50,'proccessing',44,'2023-01-23 15:52:42');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `status` enum('avaliable','not_avaliable') DEFAULT 'avaliable',
  `avatar` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'tea',5,2,'avaliable','\"http://localhost/images/product/1.jpg\"'),(2,'tea 2',10,2,'not_avaliable','http://localhost/images/product/tea 2_1674333675.jpeg'),(3,'tea with milk',10,2,'not_avaliable','\"http://localhost/images/product/1.jpg\"'),(4,'tea bel n3na3',11,2,'avaliable','http://localhost/images/product/tea bel n3na3_1674333700.jpeg'),(5,'tea 5',5,2,'not_avaliable','\"http://localhost/images/product/1.jpg\"'),(6,'coffee',20,2,'avaliable','\"http://localhost/images/product/2.png\"'),(7,'coffee with milk',24,2,'avaliable','http://localhost/images/product/coffee with milk_1674333735.jpeg'),(8,'coffee 3',20,2,'not_avaliable','\"http://localhost/images/product/2.png\"'),(9,'coffee 4',20,2,'avaliable','http://localhost/images/product/coffee 4_1674333763.jpeg'),(10,'coffee 5',20,2,'not_avaliable','\"http://localhost/images/product/2.png\"'),(11,'redbull',50,5,'avaliable','\"http://localhost/images/product/7.jpeg\"'),(12,'monster',60,5,'avaliable','\"http://localhost/images/product/8.jpeg\"'),(13,'pepsi',10,4,'avaliable','\"http://localhost/images/product/3.png\"'),(14,'pepsi 2',10,4,'avaliable','http://localhost/images/product/pepsi 2_1674333603.jpeg'),(15,'coca',10,4,'avaliable','\"http://localhost/images/product/7.jpeg\"'),(16,'water',10,1,'avaliable','\"http://localhost/images/product/9.jpeg\"'),(17,'xz',2,4,'avaliable','http://localhost/images/product/xz_1674333637.jpeg'),(18,'new product',40,3,'avaliable','http://localhost/images/product/new category_1674230634.png'),(19,'mm',100,21,'avaliable','http://localhost/images/product/mm_1674383685.png'),(20,'new 122',40,5,'avaliable','http://localhost/images/product/new 122_1674489485.png');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_orders`
--

DROP TABLE IF EXISTS `product_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_orders` (
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `price` int NOT NULL,
  `qty` int DEFAULT NULL,
  PRIMARY KEY (`product_id`,`order_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `product_orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_orders_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_orders`
--

LOCK TABLES `product_orders` WRITE;
/*!40000 ALTER TABLE `product_orders` DISABLE KEYS */;
INSERT INTO `product_orders` VALUES (1,1,15,3),(1,7,10,2),(1,8,10,2),(1,9,10,2),(1,10,10,2),(1,11,10,2),(1,12,10,2),(1,13,10,2),(1,14,10,2),(1,19,5,1),(1,21,20,4),(1,23,20,4),(1,24,10,2),(1,25,20,4),(1,26,15,3),(1,28,5,1),(1,31,10,2),(1,41,5,1),(2,1,5,1),(2,7,20,4),(2,8,20,4),(2,9,20,4),(2,10,20,4),(2,11,20,4),(2,12,20,4),(2,13,20,4),(2,14,20,4),(2,19,10,2),(3,13,10,2),(3,14,10,2),(3,23,20,2),(3,24,10,1),(4,2,5,1),(4,13,10,2),(4,14,10,2),(4,30,11,1),(4,31,33,3),(4,41,11,1),(5,2,10,2),(5,13,10,2),(5,14,10,2),(6,13,40,2),(6,14,40,2),(6,21,20,1),(6,33,20,1),(6,41,20,1),(7,3,20,1),(7,4,20,1),(7,5,80,4),(7,6,80,4),(7,13,40,2),(7,14,40,2),(7,30,24,1),(7,32,24,1),(7,43,96,4),(7,45,24,1),(8,3,40,2),(8,4,40,2),(8,5,40,2),(8,6,40,2),(9,32,20,1),(9,36,20,1),(9,45,20,1),(11,15,50,1),(11,16,50,1),(11,32,50,1),(11,37,50,1),(11,39,50,1),(11,43,50,1),(12,15,60,1),(12,16,60,1),(12,17,120,2),(12,18,600,10),(12,20,120,2),(12,21,120,2),(12,35,120,2),(13,17,10,1),(13,35,10,1),(14,15,40,4),(14,16,40,4),(14,17,10,1),(14,22,30,3),(14,27,10,1),(14,44,20,2),(15,15,10,1),(15,16,10,1),(15,17,40,4),(15,22,30,3),(15,29,20,2),(15,33,30,3),(15,35,30,3),(16,22,30,3),(16,34,10,1),(17,44,4,2),(18,27,40,1),(18,40,40,1),(18,42,40,1),(19,38,100,1),(19,40,100,1),(19,42,100,1);
/*!40000 ALTER TABLE `product_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `room` int unsigned NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `room` (`room`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','admin@gmail.com','Mo7amed7#','http://localhost/images/user/admin.png',0,'admin'),(2,'mohamedsarhan','mohamedsarhan@gmail.com','Mo7amed7#','http://localhost/images/user/1-m.png',1,'user'),(3,'kreem','kreem@mail.com','Mo7amed7#','http://localhost/images/user/4-m.png',2,'user'),(4,'hosaam','hosaam@gmail.com','Mo7amed7#','http://localhost/images/user/5-m.png',3,'user'),(5,'mohamedamr','mohamedamr@gmail.com','Mo7amed7#','http://localhost/images/user/6-m.png',4,'user'),(6,'eman','eman@gmail.com','Mo7amed7#','http://localhost/images/user/2-f.png',5,'user'),(7,'ola','ola@gmail.com','Mo7amed7#','http://localhost/images/user/3-f.png',6,'user'),(24,'user   c2','user2@gmail.com','Mo7amed7##','http://localhost/images/user/user2_1674054994.png',17,'user'),(25,'user3','user3@m.com','Mo7amed7#','http://localhost/images/user/user3_1674055039.png',18,'user'),(30,'123eqw','user55@gg.com','Mo7amed7#','http://localhost/images/user/123eqw_1674127858.png',22,'user'),(31,'nnn','nn@m.com','Mo7amed7#','http://localhost/images/user/nnn_1674127919.png',34,'user'),(32,'das','ads@m.xzo','Mo7amed7#','http://localhost/images/user/das_1674128110.png',50,'user'),(33,'aaa','aaa@m.ll','Mo7amed7#','http://localhost/images/user/aaa_1674129329.png',49,'user'),(34,'www','wwwwwww@wdq.cpm','Mo7amed7#','http://localhost/images/user/_1674333293.png',47,'user'),(35,'mo','mo@gamil.com','Mo7amed7#','http://localhost/images/user/mo_1674384544.png',35,'user'),(36,'user111','user111@gmail.com','Mo7amed7#','http://localhost/images/user/user111_1674488344.png',36,'user'),(37,'user112','userr112@gmail.com','Mo7amed7#','http://localhost/images/user/_1674489408.png',37,'user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-01 19:35:46
