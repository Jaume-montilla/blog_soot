CREATE DATABASE IF NOT EXISTS blog;
USE blog;

CREATE USER 'blog'@'%' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON blog.* TO 'testing'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS USRS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    eMail VARCHAR(100) UNIQUE NOT NULL,
    Passwd VARCHAR(255) NOT NULL,
    ROL ENUM('USER', 'ADMIN') DEFAULT 'USER',
    Likes INT DEFAULT 0 NOT NULL,
    Edad INT NOT NULL
);

CREATE TABLE IF NOT EXISTS COMMENTS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UsrID INT NOT NULL,
    CreateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    InfoTxt TINYTEXT NOT NULL,
    IDRelated INT,
    FOREIGN KEY (UsrID) REFERENCES USRS(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ARTICLES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100) NOT NULL,
    CommentID INT,
    InfoTxt TEXT NOT NULL,
    IMG VARCHAR(255),
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CreatedBy INT NOT NULL,
    Modify TINYINT(1) DEFAULT 0 NOT NULL,
    ModifyBy INT, 
    Rating DECIMAL(2,1) DEFAULT 0 NOT NULL,
    FOREIGN KEY (CreatedBy) REFERENCES USRS(ID) ON DELETE CASCADE,
    FOREIGN KEY (ModifyBy) REFERENCES USRS(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FAVORITE (
    UsrID INT NOT NULL,
    ArticleID INT NOT NULL,
    PRIMARY KEY (UsrID, ArticleID),
    FOREIGN KEY (UsrID) REFERENCES USRS(ID) ON DELETE CASCADE,
    FOREIGN KEY (ArticleID) REFERENCES ARTICLES(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS REVIEWS(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100) NOT NULL,
    InfoText TINYTEXT NOT NULL,
    Rating DECIMAL(2,1) NOT NULL,
    CreateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    IDArticle INT NOT NULL,
    UsrID INT NOT NULL,
    FOREIGN KEY (IDArticle) REFERENCES ARTICLES(ID) ON DELETE CASCADE,
    FOREIGN KEY (UsrID) REFERENCES USRS(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS COOKIES (
    Cookie VARCHAR(50), 
    UsrID INT NOT NULL, 
    FOREIGN KEY (UsrID) REFERENCES USRS(ID) ON DELETE CASCADE
);

ALTER TABLE COOKIES ADD UNIQUE (UsrID);

CREATE TABLE IF NOT EXISTS COMMENTSSAVED (
    IDComment INT NOT NULL,
    UsrID INT NOT NULL,
    PRIMARY KEY (IDComment, UsrID),
    FOREIGN KEY (IDComment) REFERENCES COMMENTS(ID) ON DELETE CASCADE,
    FOREIGN KEY (UsrID) REFERENCES USRS(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS COMMENTSARTICLES (
    IDComment INT NOT NULL,
    IDArticle INT NOT NULL,
    PRIMARY KEY (IDComment, IDArticle),
    FOREIGN KEY (IDComment) REFERENCES COMMENTS(ID) ON DELETE CASCADE,
    FOREIGN KEY (IDArticle) REFERENCES ARTICLES(ID) ON DELETE CASCADE
);

INSERT INTO USRS (Name, Surname, eMail, Passwd, ROL, Likes, Edad) 
VALUES 
('Admin', 'User', 'admin@example.com', '$2y$10$NGRWfKHaxnQdFYljCkcwm.Ig.3qXbuw0BCXGMiNJXhLxaU2OghaeK', 'ADMIN', 0, 30)
ON DUPLICATE KEY UPDATE
Name=VALUES(Name), Surname=VALUES(Surname), eMail=VALUES(eMail), Passwd=VALUES(Passwd), ROL=VALUES(ROL), Likes=VALUES(Likes), Edad=VALUES(Edad);