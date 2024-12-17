-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.39

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

CREATE DATABASE IF NOT EXISTS blog;
USE blog;
--
-- Table structure for table `ARTICLES`
--

DROP TABLE IF EXISTS `ARTICLES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ARTICLES` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `CommentID` int DEFAULT NULL,
  `InfoTxt` text NOT NULL,
  `IMG` varchar(255) DEFAULT NULL,
  `DateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` int NOT NULL,
  `Modify` tinyint(1) NOT NULL DEFAULT '0',
  `ModifyBy` int DEFAULT NULL,
  `Rating` decimal(2,1) DEFAULT NULL,
  `RatedCount` int DEFAULT NULL,
  `Conexiones` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CreatedBy` (`CreatedBy`),
  KEY `ModifyBy` (`ModifyBy`),
  CONSTRAINT `ARTICLES_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `USRS` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `ARTICLES_ibfk_2` FOREIGN KEY (`ModifyBy`) REFERENCES `USRS` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `ARTICLES_chk_1` CHECK (((`Rating` >= 0) and (`Rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ARTICLES`
--

LOCK TABLES `ARTICLES` WRITE;
/*!40000 ALTER TABLE `ARTICLES` DISABLE KEYS */;
INSERT INTO `ARTICLES` VALUES (20,'Optimización de consultas SQL TE IMAGINAS',NULL,'La optimización de consultas SQL es crucial para mejorar el rendimiento de las bases de datos, especialmente cuando se trabaja con grandes volúmenes de datos. Este artículo analiza las mejores prácticas para escribir consultas SQL eficientes y rápidas en MySQL. Abordamos temas como el uso adecuado de índices, la escritura de consultas con JOINs eficientes, la utilización de subconsultas y cómo evitar las consultas que pueden generar un impacto negativo en el rendimiento. Además, exploramos las herramientas que MySQL ofrece para medir el rendimiento de las consultas, como el comando EXPLAIN, y cómo interpretar su salida para identificar cuellos de botella. Si eres un desarrollador o DBA, este artículo te ayudará a mejorar la velocidad de tus consultas y la eficiencia general de tu base de datos. ASI ES, SIY UNA BESTIA','optimize_queries.jpg','2024-11-25 00:35:28',7,1,8,5.0,2,23),(21,'Manejo de transacciones en MySQL',NULL,'Las transacciones son un aspecto fundamental en el manejo de bases de datos, ya que permiten garantizar la integridad y consistencia de los datos. Este artículo se enfoca en explicar cómo funcionan las transacciones en MySQL y cómo utilizarlas correctamente. Cubrimos conceptos clave como los niveles de aislamiento de transacciones, el uso de los comandos COMMIT y ROLLBACK, y cómo manejar las transacciones en un entorno de múltiples usuarios. Además, veremos cómo MySQL maneja las transacciones de manera automática y cómo se puede mejorar su control utilizando transacciones explícitas. Al final del artículo, tendrás una comprensión sólida de cómo utilizar transacciones para mantener la consistencia de los datos en tu base de datos, incluso en situaciones complejas con múltiples operaciones.','transactions_mysql.jpg','2024-11-25 00:35:28',8,0,NULL,5.0,2,6),(23,'Diseño y normalización de bases de datos en MySQL',NULL,'El diseño adecuado de una base de datos es crucial para asegurar su escalabilidad, eficiencia y mantenimiento a largo plazo. Este artículo proporciona una guía completa sobre cómo diseñar bases de datos en MySQL, comenzando por el análisis de requisitos y la creación del esquema de base de datos. Abordamos los principios de la normalización de bases de datos, explicando las diferentes formas normales y cómo aplicarlas para evitar la redundancia de datos y mejorar la integridad. También discutimos el diseño de claves primarias y foráneas, la creación de relaciones entre tablas, y las mejores prácticas para garantizar que el diseño de tu base de datos sea flexible y eficiente. Con ejemplos prácticos, este artículo es una lectura obligada para quienes desean aprender a diseñar bases de datos robustas y bien estructuradas en MySQL.','db_design.jpg','2024-11-25 00:35:28',6,0,NULL,4.5,NULL,1),(24,'MySQL y la seguridad en bases de datos',NULL,'La seguridad de las bases de datos es un aspecto crítico para proteger la información sensible y garantizar que solo los usuarios autorizados puedan acceder y modificar los datos. Este artículo cubre las mejores prácticas de seguridad en MySQL, incluyendo la gestión de usuarios y privilegios, la encriptación de datos y la protección contra inyecciones SQL. También se profundiza en la implementación de políticas de respaldo y restauración seguras, así como en la auditoría y monitoreo de la actividad de la base de datos. Además, discutimos cómo utilizar SSL/TLS para asegurar la comunicación entre clientes y servidores de bases de datos, y cómo implementar medidas para prevenir ataques comunes. Si eres un administrador de bases de datos, este artículo te ayudará a proteger la información valiosa almacenada en tus bases de datos MySQL.','mysql_security.jpg','2024-11-25 00:35:28',7,0,NULL,4.6,NULL,NULL),(25,'Replicación y alta disponibilidad en MySQL',NULL,'La replicación y la alta disponibilidad son aspectos esenciales para garantizar la continuidad del servicio en sistemas de bases de datos a gran escala. Este artículo explica cómo configurar la replicación en MySQL, una técnica que permite duplicar los datos de una base de datos en uno o más servidores. Exploramos los diferentes tipos de replicación disponibles, como la replicación maestro-esclavo y la replicación en cadena, y cómo gestionar la sincronización de datos entre los servidores. Además, discutimos la configuración de clústeres MySQL para lograr alta disponibilidad, lo que permite que las bases de datos sigan funcionando incluso si un servidor falla. Este artículo es ideal para administradores de bases de datos que deseen mejorar la fiabilidad y la escalabilidad de sus sistemas de bases de datos.','mysql_replication.jpg','2024-11-25 00:35:28',8,0,NULL,4.7,NULL,2),(31,'la cabra',NULL,'khfajklhsdfjhlasjkfkjsdfklsjdfkasjfdñ','hola','2024-11-26 08:54:20',6,0,NULL,5.0,1,14);
/*!40000 ALTER TABLE `ARTICLES` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_del_art` BEFORE DELETE ON `ARTICLES` FOR EACH ROW BEGIN
    INSERT INTO log_art (ID, Title, InfoTxt, IMG, DateCreated, CreatedBy)
    VALUES (OLD.ID, OLD.Title, OLD.InfoTxt, OLD.IMG, OLD.DateCreated, OLD.CreatedBy);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `COMMENTS`
--

DROP TABLE IF EXISTS `COMMENTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMMENTS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `UsrID` int NOT NULL,
  `CreateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `InfoTxt` tinytext NOT NULL,
  `IDRelated` int DEFAULT NULL,
  `Validated` int DEFAULT (0),
  PRIMARY KEY (`ID`),
  KEY `UsrID` (`UsrID`),
  CONSTRAINT `COMMENTS_ibfk_1` FOREIGN KEY (`UsrID`) REFERENCES `USRS` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMMENTS`
--

LOCK TABLES `COMMENTS` WRITE;
/*!40000 ALTER TABLE `COMMENTS` DISABLE KEYS */;
INSERT INTO `COMMENTS` VALUES (35,7,'2024-11-25 00:36:09','Muy buen artículo. Espero ver más sobre el tema.',NULL,0),(37,9,'2024-11-25 00:36:09','Buen artículo, pero algunos pasos pueden ser confusos si no se tiene experiencia previa.',NULL,0),(38,6,'2024-11-25 00:36:09','La reseña refleja bien mi experiencia, aunque tal vez el artículo sea un poco técnico para principiantes.',1,0),(41,6,'2024-11-25 07:38:43','Mentira, no me gusto',37,0),(42,6,'2024-11-25 08:30:05','Me gusto mucho el articulo',NULL,0),(43,6,'2024-11-25 08:32:07','a mi tambien',42,0),(49,9,'2024-11-25 09:14:29','Muy interesante!!!!',NULL,0),(58,6,'2024-11-26 18:34:39','hola',NULL,0),(68,6,'2024-11-26 20:37:31','hola',NULL,0),(72,6,'2024-12-02 12:05:01','hola',NULL,1),(73,24,'2024-12-02 12:16:19','hola que tal',NULL,1),(74,24,'2024-12-02 12:18:32','test',NULL,1);
/*!40000 ALTER TABLE `COMMENTS` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_del_comments` BEFORE DELETE ON `COMMENTS` FOR EACH ROW BEGIN
    INSERT INTO log_comments (ID, UsrID, CreateDate, InfoTxt)
    VALUES (OLD.ID, OLD.UsrID, OLD.CreateDate, OLD.InfoTxt);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `COMMENTSARTICLES`
--

DROP TABLE IF EXISTS `COMMENTSARTICLES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMMENTSARTICLES` (
  `IDComment` int NOT NULL,
  `IDArticle` int NOT NULL,
  PRIMARY KEY (`IDComment`,`IDArticle`),
  KEY `IDArticle` (`IDArticle`),
  CONSTRAINT `COMMENTSARTICLES_ibfk_1` FOREIGN KEY (`IDComment`) REFERENCES `COMMENTS` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `COMMENTSARTICLES_ibfk_2` FOREIGN KEY (`IDArticle`) REFERENCES `ARTICLES` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMMENTSARTICLES`
--

LOCK TABLES `COMMENTSARTICLES` WRITE;
/*!40000 ALTER TABLE `COMMENTSARTICLES` DISABLE KEYS */;
INSERT INTO `COMMENTSARTICLES` VALUES (68,20),(74,20),(38,21),(42,21),(43,21),(58,21),(35,23),(37,24),(41,24),(49,25),(72,31),(73,31);
/*!40000 ALTER TABLE `COMMENTSARTICLES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMMENTSSAVED`
--

DROP TABLE IF EXISTS `COMMENTSSAVED`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMMENTSSAVED` (
  `IDComment` int NOT NULL,
  `UsrID` int NOT NULL,
  PRIMARY KEY (`IDComment`,`UsrID`),
  KEY `UsrID` (`UsrID`),
  CONSTRAINT `COMMENTSSAVED_ibfk_1` FOREIGN KEY (`IDComment`) REFERENCES `COMMENTS` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `COMMENTSSAVED_ibfk_2` FOREIGN KEY (`UsrID`) REFERENCES `USRS` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMMENTSSAVED`
--

LOCK TABLES `COMMENTSSAVED` WRITE;
/*!40000 ALTER TABLE `COMMENTSSAVED` DISABLE KEYS */;
INSERT INTO `COMMENTSSAVED` VALUES (38,6),(35,8),(37,10);
/*!40000 ALTER TABLE `COMMENTSSAVED` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COOKIES`
--

DROP TABLE IF EXISTS `COOKIES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COOKIES` (
  `Cookie` varchar(50) DEFAULT NULL,
  `UsrID` int NOT NULL,
  UNIQUE KEY `UsrID` (`UsrID`),
  CONSTRAINT `COOKIES_ibfk_1` FOREIGN KEY (`UsrID`) REFERENCES `USRS` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COOKIES`
--

LOCK TABLES `COOKIES` WRITE;
/*!40000 ALTER TABLE `COOKIES` DISABLE KEYS */;
INSERT INTO `COOKIES` VALUES ('JQ3h6bRuOB22019rfsPpZWkQcg9wzKLNMkbT8yo92PJWp7vZa',6),('yE1cCGyLbPAyla1kmsyZ3vcQ10MYXCkLmlAay1ulcvH6MNu8l',9),('vu6WH6IejYndQZcrtkTv0CfQuL89DJcsc3kJw6mH28IUHn0jw',19),('2CCyq0ermpYIXDc9MKzEb5g6OsTrb3pfHurHO5veSxZLWHHYC',22),('d5a8m0OiCgi8y5XN0V97DoYRN802lx0YY2WmxqJF9Q35t1UCJ',23),('qpZvnzu1JsqdFUUqkRpGR6jh9cHz1VwzdQo769LIZLrs0D1o2',24);
/*!40000 ALTER TABLE `COOKIES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FAVORITE`
--

DROP TABLE IF EXISTS `FAVORITE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FAVORITE` (
  `UsrID` int NOT NULL,
  `ArticleID` int NOT NULL,
  PRIMARY KEY (`UsrID`,`ArticleID`),
  KEY `ArticleID` (`ArticleID`),
  CONSTRAINT `FAVORITE_ibfk_1` FOREIGN KEY (`UsrID`) REFERENCES `USRS` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FAVORITE_ibfk_2` FOREIGN KEY (`ArticleID`) REFERENCES `ARTICLES` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FAVORITE`
--

LOCK TABLES `FAVORITE` WRITE;
/*!40000 ALTER TABLE `FAVORITE` DISABLE KEYS */;
INSERT INTO `FAVORITE` VALUES (6,23);
/*!40000 ALTER TABLE `FAVORITE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVIEWS`
--

DROP TABLE IF EXISTS `REVIEWS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REVIEWS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `InfoText` tinytext NOT NULL,
  `Rating` decimal(2,1) NOT NULL,
  `CreateDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IDArticle` int NOT NULL,
  `UsrID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDArticle` (`IDArticle`),
  KEY `UsrID` (`UsrID`),
  CONSTRAINT `REVIEWS_ibfk_1` FOREIGN KEY (`IDArticle`) REFERENCES `ARTICLES` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `REVIEWS_ibfk_2` FOREIGN KEY (`UsrID`) REFERENCES `USRS` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `REVIEWS_chk_1` CHECK (((`Rating` >= 0) and (`Rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVIEWS`
--

LOCK TABLES `REVIEWS` WRITE;
/*!40000 ALTER TABLE `REVIEWS` DISABLE KEYS */;
INSERT INTO `REVIEWS` VALUES (16,'Excelente explicación','Las consultas SQL nunca fueron tan claras, muy útil...',5.0,'2024-11-25 00:39:16',23,7),(17,'Interesante pero complejo','El tema de transacciones es interesante, aunque me costó entenderlo...',3.5,'2024-11-25 00:39:16',20,8),(18,'Buen artículo para iniciarse','Un buen punto de partida para aprender sobre MySQL...',4.0,'2024-11-25 00:39:16',24,9),(19,'Muy detallado','Me ha ayudado a mejorar la estructura de mi base de datos...',4.8,'2024-11-25 00:39:16',21,10),(23,'GUENISIMO','EL MEJOR',4.0,'2024-11-26 08:55:41',20,6),(24,'test','test',4.0,'2024-11-26 23:01:39',20,6);
/*!40000 ALTER TABLE `REVIEWS` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_del_reviews` BEFORE DELETE ON `REVIEWS` FOR EACH ROW BEGIN
    INSERT INTO log_reviews (ID, Title, InfoText, Rating, CreateDate, IDArticle, UsrID)
    VALUES (OLD.ID, OLD.UsrID, OLD.CreateDate, OLD.InfoText, OLD.Title, OLD.Rating, OLD.IDArticle);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `USRS`
--

DROP TABLE IF EXISTS `USRS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USRS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `eMail` varchar(100) NOT NULL,
  `Passwd` varchar(255) NOT NULL,
  `ROL` enum('USER','ADMIN') DEFAULT 'USER',
  `Likes` int NOT NULL DEFAULT '0',
  `Edad` timestamp NULL DEFAULT NULL,
  `Conexiones` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `eMail` (`eMail`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USRS`
--

LOCK TABLES `USRS` WRITE;
/*!40000 ALTER TABLE `USRS` DISABLE KEYS */;
INSERT INTO `USRS` VALUES (6,'jaume','Montilla','jmonti@monti.es','$2y$10$WAp4Di4/gCMaU.3mt.ZqcuYtkRkh0o1NWajXDMRfIgkr6s1JFbNES','ADMIN',0,NULL,5),(7,'yaiza','yaiza','yaiza@yaiza.es','$2y$10$0W/myX9R.uwRFXDPMPOmZ.mDEolZtEkX5BJwPbsK.nJ.nqwYU.rAy','USER',0,NULL,NULL),(8,'Dani','Ruesca','dani@dani.dani','$2y$10$ai.90/n0mS5a6csvzc.VQuWls4pJ1qi//VrX/K1lnWE6xan2c1aNW','ADMIN',0,NULL,NULL),(9,'test','testeo','test@test.test','$2y$10$Idv3qbwe9ZyOpRgSvMoT1uatpin1xG1RVBWyEhPnE7aBxA0aySFIi','USER',0,NULL,NULL),(10,'aleix','mar','matinez@aleix.es','$2y$10$anhBK4z3JCPlZplORFHVz.rgUdhfH0P36VH1Z5gmZ0ecaCsXdAU5C','USER',0,NULL,NULL),(18,'francisco','el','assies@asies.asies','$2y$10$T5LpA6ZYPT0NmSznThRokugUuYqe.O/kPGZOTLKlCMXEtex5WLtOC','USER',0,NULL,NULL),(19,'Mitu','monti','mitu@mitu.es','$2y$10$JV.PJzJCB9SvkdfTowl4RurostEHRg75LXYBt6M2nb7OPRgzfjnfu','USER',0,NULL,NULL),(20,'','','','$2y$10$OS6RPDRsM9vyrroYXZHCHOWSU/7SAyttM960i4u3eyMw9okqChZLm','USER',0,'2024-11-27 23:00:00',NULL),(21,'jaumemonti','mitumonti','a@a.a','$2y$10$iAIQbQRcU8oU1o7So0VFyu8PKZNFviaVkkxv541uXpHCUKWtt/Lg6','USER',0,'2024-11-27 23:00:00',NULL),(22,'b','b','b@b.b','$2y$10$4PbZ1RfVJobO/JYK4uNP2OUA0047BWtBJG9KpPJlmZ1Io4NeifZx2','USER',0,'2003-09-06 22:00:00',NULL),(23,'Jaume','anda','anda@anda.anda','$2y$10$AytQdY6AD/4DZiegJ9kBN.GUqI541mfO3MCny7dGMN7z05RDeyeKS','USER',0,'2024-10-14 22:00:00',NULL),(24,'hola','hola','hola@hola.hola','$2y$10$Gc.3E9iWWVvxm6RfGzYQK.tIa78ZwXcvS3xlOHXBDZQBhVZyMiXCm','USER',0,'2023-11-10 23:00:00',4);
/*!40000 ALTER TABLE `USRS` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trig_del_usrs` BEFORE DELETE ON `USRS` FOR EACH ROW BEGIN
    INSERT INTO log_usrs (ID, Name, Surname, eMail, Passwd, ROL, Edad)
    VALUES (OLD.ID, OLD.Name, OLD.Surname, OLD.eMail, OLD.Passwd, OLD.ROL, OLD.Edad);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `log_art`
--

DROP TABLE IF EXISTS `log_art`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_art` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `CommentID` int DEFAULT NULL,
  `InfoTxt` text NOT NULL,
  `IMG` varchar(255) DEFAULT NULL,
  `DateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` int NOT NULL,
  `Modify` tinyint(1) NOT NULL DEFAULT '0',
  `ModifyBy` int DEFAULT NULL,
  `Rating` decimal(2,1) NOT NULL DEFAULT '0.0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_art`
--

LOCK TABLES `log_art` WRITE;
/*!40000 ALTER TABLE `log_art` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_art` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_comments`
--

DROP TABLE IF EXISTS `log_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_comments` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `UsrID` int NOT NULL,
  `CreateDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `InfoTxt` tinytext NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_comments`
--

LOCK TABLES `log_comments` WRITE;
/*!40000 ALTER TABLE `log_comments` DISABLE KEYS */;
INSERT INTO `log_comments` VALUES (36,8,'2024-11-25 00:36:09','Creo que el artículo debería haber sido más específico en algunos puntos, pero en general es bueno.'),(70,23,'2024-12-02 07:40:57','hola'),(71,23,'2024-12-02 08:19:18','hola');
/*!40000 ALTER TABLE `log_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_reviews`
--

DROP TABLE IF EXISTS `log_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_reviews` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `InfoText` tinytext NOT NULL,
  `Rating` decimal(2,1) NOT NULL,
  `CreateDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IDArticle` int NOT NULL,
  `UsrID` int NOT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `log_reviews_chk_1` CHECK (((`Rating` >= 0) and (`Rating` <= 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_reviews`
--

LOCK TABLES `log_reviews` WRITE;
/*!40000 ALTER TABLE `log_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_usrs`
--

DROP TABLE IF EXISTS `log_usrs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_usrs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `eMail` varchar(100) NOT NULL,
  `Passwd` varchar(255) NOT NULL,
  `ROL` enum('USER','ADMIN') DEFAULT 'USER',
  `Likes` int NOT NULL DEFAULT '0',
  `Edad` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `eMail` (`eMail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_usrs`
--

LOCK TABLES `log_usrs` WRITE;
/*!40000 ALTER TABLE `log_usrs` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_usrs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoracion`
--

DROP TABLE IF EXISTS `valoracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoracion` (
  `valor` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`article_id`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `valoracion_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USRS` (`ID`),
  CONSTRAINT `valoracion_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `ARTICLES` (`ID`),
  CONSTRAINT `valoracion_chk_1` CHECK (((`valor` >= 0) and (`valor` <= 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoracion`
--

LOCK TABLES `valoracion` WRITE;
/*!40000 ALTER TABLE `valoracion` DISABLE KEYS */;
INSERT INTO `valoracion` VALUES (5,24,20),(5,24,25);
/*!40000 ALTER TABLE `valoracion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-15 14:18:10
