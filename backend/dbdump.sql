-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: quanly_phongtro
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('0bc0ccca-e18c-4f27-9132-b259dbf6ea50','admin','$2b$12$LMYL6omtWyAwqP0zWRJfD.7lvpNqLzlW80G6/wzY5dY6uGn7WNBsC');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` varchar(100) NOT NULL,
  `roomID` int NOT NULL,
  `numberOfMonth` int NOT NULL,
  `sumOfMoney` int NOT NULL,
  `createdAt` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roomID` (`roomID`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`roomID`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES ('0d7015a9-7a56-4265-b853-297bf60b0442',104,1,2500000,'2020-07-02'),('e4a0d2e2-c240-4227-b930-0297d8e7025a',101,2,4000000,'2020-07-02');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `id` varchar(100) NOT NULL,
  `customerID` varchar(100) NOT NULL,
  `dayStart` date NOT NULL,
  `dayEnd` date NOT NULL,
  `roomNumber` int NOT NULL,
  `deposit` int NOT NULL,
  `paidMoney` int NOT NULL,
  `moreInformation` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lease_contract_ibfk_1` (`customerID`),
  CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES ('765d6e96-b44f-41ad-9835-5cb15cfe1be1','61326f76-b386-41e7-adbc-fb581a7d36f2','2020-07-01','2021-07-01',101,500,500,''),('bd07d0de-3055-45eb-b644-de03582758a1','dac6214a-49f1-4d66-886d-28bbf94c7369','2020-08-01','2020-08-01',102,1000,1000,'Abc');
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` varchar(100) NOT NULL,
  `roomID` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `idNumber` int NOT NULL,
  `address` varchar(1000) NOT NULL,
  `job` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_ibfk_1_idx` (`roomID`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`roomID`) REFERENCES `rooms` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('61326f76-b386-41e7-adbc-fb581a7d36f2',101,'Phu','1998-08-18',1234567890,'Ha Noi','Sinh vien','987654321'),('b06c5b4b-e47f-4450-b4de-3fa0f455ee73',103,'Jennie','1996-01-16',16196,'Hcm','Sinh vien','12345'),('dac6214a-49f1-4d66-886d-28bbf94c7369',102,'Vicky','2000-07-05',987654321,'Hanoi','Sinh vien','123456789');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL,
  `status` tinyint NOT NULL,
  `monthlyRent` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (101,1,2500000),(102,1,2000000),(103,0,2000000),(104,0,2000000),(105,0,1111);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `pricePerUnit` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Internet',50000),(2,'Điện',50000),(3,'Nước',30000);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `use_services`
--

DROP TABLE IF EXISTS `use_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `use_services` (
  `id` varchar(100) NOT NULL,
  `serviceID` int NOT NULL,
  `roomID` int NOT NULL,
  `dayUseService` date NOT NULL,
  `unit` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `serviceID` (`serviceID`),
  KEY `roomID` (`roomID`),
  CONSTRAINT `use_services_ibfk_1` FOREIGN KEY (`serviceID`) REFERENCES `services` (`id`),
  CONSTRAINT `use_services_ibfk_2` FOREIGN KEY (`roomID`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_services`
--

LOCK TABLES `use_services` WRITE;
/*!40000 ALTER TABLE `use_services` DISABLE KEYS */;
INSERT INTO `use_services` VALUES ('45d4a5e1-cc42-4415-89b2-7bc0598621a1',3,101,'2020-06-30',50),('8d5361bf-7264-4d33-8e11-57a613f39e17',1,101,'2020-06-07',2),('c3269c01-ae1b-4be9-8d83-20647b753ef7',2,101,'2020-06-09',30);
/*!40000 ALTER TABLE `use_services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-02  5:57:41
