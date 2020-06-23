-- MySQL dump 10.13  Distrib 8.0.19, for osx10.14 (x86_64)
--
-- Host: localhost    Database: pdelivery
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `pdelivery`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `pdelivery` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `pdelivery`;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `shipmentID` int NOT NULL,
  `Category` varchar(15) NOT NULL,
  `ItemLink` varchar(300) DEFAULT NULL,
  `Weight` int NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`ID`,`shipmentID`),
  KEY `shipmentID` (`shipmentID`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`shipmentID`) REFERENCES `shipment` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,12,'Other','https://lms.sehir.edu.tr/login/index.php',1,'Quiz',2),(2,13,'Other','https://lms.sehir.edu.tr/login/index.php',1,'quiz',1),(3,14,'Electronic','https://www.apple.com/tr/shop/buy-mac/macbook-pro/13-in%C3%A7-uzay-grisi-1.4-ghz-4-%C3%A7ekirdekli-i%CC%87%C5%9Flemci,-3.9-ghz%E2%80%99e-kadar-turbo-boost-256gb?afid=p238%7CshCfnCsYR-dc_mtid_187079nc38483_pcrid_420747447824_pgrid_97222144318_&cid=aos-tr-kwgo-pla-mac--slid---product-MXK32TU/A-TR',2,'Macbook',1),(4,15,'Electronic','https://www.apple.com/tr/shop/buy-iphone/iphone-11-pro',1,'Iphone 11 pro',1),(5,18,'Accessories','https://www.amazon.com/Nike-Running-Electric-Black-Vapor-Green-Phantom/dp/B07SDG4CGQ/ref=sr_1_1?crid=1SEMTIGFG3ORT&dchild=1&keywords=nike+vaporfly&qid=1590952069&sprefix=nike+vap%2Caps%2C284&sr=8-1',0,'nike vaporfly',1),(6,19,'Other','https://www.amazon.com/Lixada-Breathable-Training-Exercise-Reflective/dp/B07P33JJJQ/ref=sr_1_37?dchild=1&keywords=running&qid=1590952239&sr=8-37',0,'running shorts',2),(7,21,'Electronic','https://www.trendyol.com/xiaomi/mi-wifi-pro-sinyal-yakinlastirici---guclendirici-300-mbps-p-3607033?boutiqueId=411304&merchantId=110889&popup_id=2044348680&gclid=CjwKCAjwq832BRA5EiwACvCWsaLX2pRemW7eUkpcz7Iij9vQTPGk0jZfPDibpGI4kg772J4-sE6-QRoCMwgQAvD_BwE',1,'Router',1),(8,22,'Electronic','https://www.trendyol.com/xiaomi/redmi-airdots-tws-bluetooth-basic-5-0-kulaklik-p-6676673',1,'Headphones',1),(9,23,'Electronic','https://www.trendyol.com/xiaomi/mi-band-4-akilli-bileklik-p-6727656',1,'Watch',1),(10,24,'Other','https://www.trendyol.com/buzdagi-yayinlari/otuz-milyon-kelime-cocugunuzun-beynini-gelistirin-p-4473953?boutiqueId=370804&merchantId=123337',1,'Book',1),(11,25,'Other','jfiuerfnc',1,'Router',1);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `midpoint`
--

DROP TABLE IF EXISTS `midpoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `midpoint` (
  `District` char(20) NOT NULL,
  `TripID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`District`,`TripID`),
  KEY `TripID` (`TripID`),
  CONSTRAINT `midpoint_ibfk_1` FOREIGN KEY (`TripID`) REFERENCES `trip` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `midpoint`
--

LOCK TABLES `midpoint` WRITE;
/*!40000 ALTER TABLE `midpoint` DISABLE KEYS */;
INSERT INTO `midpoint` VALUES ('Germany',2),('Finland',4),('Denmark',6),('France',6),('Albania',8),('Turkey',9),('Turkey',10),('Albania',11),('Turkey',12),('Turkey',13),('Turkey',15),('Turkey',19),('Turkey',20),('Turkey',21),('France',26),('Albania',27),('Turkey',28),('Albania',29);
/*!40000 ALTER TABLE `midpoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TripID` int DEFAULT NULL,
  `ShipmentID` int DEFAULT NULL,
  `senderRev` int DEFAULT NULL,
  `receiverRev` int DEFAULT NULL,
  `senderUsername` varchar(50) DEFAULT NULL,
  `receiverUsername` varchar(50) DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `TripID` (`TripID`),
  KEY `ShipmentID` (`ShipmentID`),
  KEY `senderUsername` (`senderUsername`),
  KEY `receiverUsername` (`receiverUsername`),
  KEY `senderRev` (`senderRev`),
  KEY `receiverRev` (`receiverRev`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`TripID`) REFERENCES `trip` (`Id`),
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`ShipmentID`) REFERENCES `shipment` (`ID`),
  CONSTRAINT `request_ibfk_3` FOREIGN KEY (`senderUsername`) REFERENCES `user` (`Username`) ON DELETE SET NULL,
  CONSTRAINT `request_ibfk_4` FOREIGN KEY (`receiverUsername`) REFERENCES `user` (`Username`) ON DELETE SET NULL,
  CONSTRAINT `request_ibfk_5` FOREIGN KEY (`senderRev`) REFERENCES `review` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `request_ibfk_6` FOREIGN KEY (`receiverRev`) REFERENCES `review` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,3,13,2,1,'ahmedomar','Beyza_Yil',2);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TripID` int NOT NULL,
  `ShipmentID` int NOT NULL,
  `reviewerUsername` varchar(50) DEFAULT NULL,
  `revieweeUsername` varchar(50) DEFAULT NULL,
  `NumOfStars` int NOT NULL,
  `Text` varchar(500) NOT NULL,
  PRIMARY KEY (`ID`,`TripID`,`ShipmentID`),
  KEY `ShipmentID` (`ShipmentID`),
  KEY `TripID` (`TripID`),
  KEY `reviewerUsername` (`reviewerUsername`),
  KEY `revieweeUsername` (`revieweeUsername`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`ShipmentID`) REFERENCES `shipment` (`ID`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`TripID`) REFERENCES `trip` (`Id`),
  CONSTRAINT `review_ibfk_3` FOREIGN KEY (`reviewerUsername`) REFERENCES `user` (`Username`) ON DELETE SET NULL,
  CONSTRAINT `review_ibfk_4` FOREIGN KEY (`revieweeUsername`) REFERENCES `user` (`Username`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,3,13,'Beyza_Yil','ahmedomar',4,'Thanks a lot. You are a nice person!'),(2,3,13,'ahmedomar','Beyza_Yil',5,'That was a great deal! ');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) DEFAULT NULL,
  `FromLocation` varchar(20) NOT NULL,
  `ToLocation` varchar(20) NOT NULL,
  `RequestedDeliveryDate` date NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description_` varchar(250) NOT NULL,
  `OfferedReward` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Username` (`Username`),
  CONSTRAINT `shipment_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (12,'ahmedomar','Turkey','Egypt','2020-05-31','some documents','I need someone going to Egypt soon. I want to deliver some documents.',10.00),(13,'ahmedomar','Turkey','Egypt','2020-05-28','deliver a document for me','please accept my request.',10.00),(14,'asimokby','Albania','United Arab Emirates','2020-05-31','Delivering a macbook to my aunt','I need someone to deliver a macbook to my aunt please. ',20.00),(15,'Beyza_Yil','Bahrain','Turkey','2020-05-31','Get my iphone to Turkey','I bought a new iphone from abroad and I need to get it to Turkey. Please help.',25.00),(16,'Elifoo','United States','Turkey','2020-05-31','need to get a backpack from US to turkey','Please send a request as soon as possible. It is a gift for someone.',10.00),(17,'EmreBiyo','Egypt','Turkey','2020-06-18','Deliver my running shoes','I need someone to help me get a running shoe from Egypt to Turkey',10.00),(18,'HasanIO','Egypt','India','2020-06-25','Help me get my new running shoes','I need someone to pick my running shoes and get it to india please. send a request.',10.00),(19,'Jango9','Sweden','Denmark','2020-06-30','Deliver my running shorts','Please send a request as soon as possible. They are super light. ',10.00),(20,'JeremyIO','Germany','United Kingdom','2020-06-30','Help me send a gift to my friend','I need to send a gift to a friend please send your requests.',10.00),(21,'JohnIUT','United Arab Emirates','United States','2020-06-26','Can you deliver my camera','Please send a request as soon as possible. I need it quickly',10.00),(22,'kayv','Turkey','Egypt','2020-06-09','Headphones from Turkey','I need someone to get my headphones from Turkey',10.00),(23,'Marco012','Turkey','France','2020-06-16','anyone coming from Turkey','I need to get a watch from Turkey anyone traveling soon?',10.00),(24,'Memo','United Arab Emirates','Egypt','2020-06-24','Can you get me a book','Please help me get this book as soon as possible. ',10.00),(25,'ahmedomar','Afghanistan','Afghanistan','2020-07-15','deliver this stupid kid to egypt','i need to kill ahmed. I am a hacker',10.00);
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) DEFAULT NULL,
  `FromLocation` varchar(20) NOT NULL,
  `ToLocation` varchar(20) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `AvailableWeight` int NOT NULL,
  `Description` varchar(250) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Username` (`Username`),
  CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (1,'asimokby','Albania','Turkey','2020-05-29','18:10:00',3,'I will be traveling soon to Turkey. Send a request if you are interested. '),(2,'asimokby','Albania','France','2020-05-30','18:13:33',5,'Send a request as soon as possible if you want to deliver anything from Albania to France.'),(3,'Beyza_Yil','Turkey','Egypt','2020-05-28','18:19:49',9,'Who want to send something to Egypt? Send a request please. '),(4,'Beyza_Yil','Turkey','Sweden','2020-05-28','18:19:49',10,'I will fly to Sweden soon from Turkey and pass by Finland. Send a request if you are interested. '),(5,'Elifoo','Turkey','Egypt','2020-05-31','18:25:59',3,'I am heading to Egypt soon. Hit me up if you are interested. '),(6,'Elifoo','Turkey','Germany','2020-05-31','18:25:59',5,'I will fly to Germany and pass by Denmark and France. Send a request! '),(7,'EmreBiyo','Turkey','Egypt','2020-05-31','13:31:08',6,'Please let me know if you want to deliver anything from Turkey to Egypt.'),(8,'EmreBiyo','Turkey','Finland','2020-05-28','18:32:24',4,'Traveling soon to Finland and passing by Albania. Hit me up a request. '),(9,'HasanIO','India','United States','2020-05-28','18:34:42',5,'I am leaving today and heading to the states. Send a request if you are willing to deliver anything.'),(10,'HasanIO','India','Egypt','2020-06-07','18:36:56',6,'I am heading to Egypt and will stop in Turkey for a couple of hours. Send a request if you are interested.'),(11,'Jango9','Denmark','Turkey','2020-05-31','18:39:07',5,'Please send a request as soon as possible. '),(12,'JeremyIO','Germany','Egypt','2020-05-31','18:41:44',6,'Heading to Egypt and passing by Turkey. Send a request!'),(13,'JeremyIO','Germany','Sweden','2020-05-31','18:41:44',5,'Any one wants to deliver something to Sweden.'),(14,'JohnIUT','United States','India','2020-05-30','18:43:56',5,'Send a request as soon as possible if you want to deliver anything from US to India.'),(15,'JohnIUT','United States','Egypt','2020-05-30','18:43:56',5,'heading to Egypt and passing by Turkey. Send requests if you are interested. '),(16,'JuhOil','Finland','Denmark','2020-06-26','18:45:43',10,'send requests as soon as possible please. '),(17,'JuhOil','Finland','Egypt','2020-06-26','18:45:43',3,'Let me know if you want to deliver something to Egypt'),(18,'kayv','Egypt','Turkey','2020-06-27','18:47:35',4,'who wants to deliver anything to Turkey in June?'),(19,'kayv','Egypt','Germany','2020-05-18','18:48:53',3,'Send requests at least one week before the flight'),(20,'Marco012','France','Egypt','2020-05-28','18:50:14',4,'send requests as soon as possible please. '),(21,'Marco012','France','United States','2020-05-28','18:50:14',9,'Send requests at least one week before the flight'),(22,'Markuz77','France','Sweden','2020-06-11','18:54:47',5,'i will fly to Sweden in June. send a req if you are interested.'),(23,'Markuz77','France','India','2020-06-17','18:56:36',4,'Any one wants to deliver something to India!'),(24,'Memo','Egypt','France','2020-06-02','18:58:00',4,'Coming to France next week. Send requests'),(25,'Memo','Egypt','Turkey','2020-06-02','19:05:36',5,'send requests as soon as possible please. '),(26,'omarok','Egypt','United States','2020-05-31','19:07:17',5,'Coming to US next week. Send requests'),(27,'SarahOVS','Sweden','Egypt','2020-05-28','19:08:30',5,'send requests as soon as possible please. '),(28,'SarahOVS','Sweden','Egypt','2020-06-09','19:08:30',3,'I am heading to  Egypt and will stop in Turkey for a couple of hours. Send a request if you are interested.'),(29,'ahmedomar','Germany','Turkey','2020-05-31','12:49:26',10,'I will be traveling soon to Turkey. I will also pass by Albania. Send a request if you are interested. ');
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unwantedcategory`
--

DROP TABLE IF EXISTS `unwantedcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unwantedcategory` (
  `tripID` int NOT NULL,
  `Category` varchar(20) NOT NULL,
  PRIMARY KEY (`tripID`,`Category`),
  CONSTRAINT `unwantedcategory_ibfk_1` FOREIGN KEY (`tripID`) REFERENCES `trip` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unwantedcategory`
--

LOCK TABLES `unwantedcategory` WRITE;
/*!40000 ALTER TABLE `unwantedcategory` DISABLE KEYS */;
INSERT INTO `unwantedcategory` VALUES (1,'Cameras'),(1,'Food'),(2,'Electronic'),(2,'Food'),(3,'Cameras'),(4,'Accessories'),(4,'Kitchen Stuff'),(5,'Kitchen Stuff'),(5,'Stationary'),(6,'Food'),(7,'Accessories'),(8,'Electronic'),(9,'Cameras'),(10,'Weapons'),(11,'Cameras'),(12,'Accessories'),(13,'Electronic'),(14,'Cameras'),(15,'Kitchen Stuff'),(16,'Electronic'),(17,'Kitchen Stuff'),(18,'Food'),(19,'Electronic'),(20,'Accessories'),(21,'Kitchen Stuff'),(22,'Electronic'),(23,'Food'),(24,'Kitchen Stuff'),(25,'Kitchen Stuff'),(26,'Electronic'),(27,'Weapons'),(28,'Food'),(29,'Food');
/*!40000 ALTER TABLE `unwantedcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Username` varchar(50) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Country` varchar(50) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Birthday` date DEFAULT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('ahmedomar','Ahmed Asim','1234','ahmedomar@yahoo.com','United Arab Emirates','+97175835793','1998-05-12'),('asimokby','Asim Okby','1234','asem@yahoo.com','Albania','+9035343434','2020-05-27'),('Beyza_Yil','Beyza Yillmaz','1234','beyzayilimaz@gmail.com','Turkey','+905465111492','1998-12-24'),('Elifoo','Elif Emre','1234','elifEmiro@gmail.com','Turkey','+905358349790','1990-09-22'),('EmreBiyo','Emre Berk','1234','emreBerk@gmail.com','Turkey','+90569123789','1986-08-06'),('HasanIO','Hasan Minhaj','1234','hasan@gmail.com','India','+915465135856','1989-07-10'),('Jango9','Jango More','1234','jango.me@gmail.com','Denmark','+457946130','1990-09-14'),('JeremyIO','Jeremy Utah','1234','jeremy@gmail.com','Germany','+4979461800','1978-01-11'),('JohnIUT','John Smith','1234','Johnsmith@gmail.com','United States','+968876345237','1982-05-08'),('JuhOil','Juhani Olavi','1234','juhaniOliie@outlook.com','Finland','+3586497310965','1988-03-18'),('kayv','Khaled Yassen','159159','kayv@gmail.com','Egypt','+2011506090','1995-05-17'),('Marco012','Marco Rodergiz','1234','marco@hotmail.com','France','+33789645132','1966-05-28'),('Markuz77','Markus Buccheit','1234','Markuz@me.com','France','+33852146307','1985-05-16'),('Memo','Ayman Yassen','1234','memo@outlook.com','Egypt','+20','1982-05-28'),('omarok','Omar Okby','1234','omarokby@gmail.com','Egypt','+205434534','2009-05-30'),('SarahOVS','Sarah John','1234','sarah.john@outlook.com','Sweden','+46794613000','1985-10-18');
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

-- Dump completed on 2020-06-23 18:52:21
