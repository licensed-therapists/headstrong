DROP DATABASE IF EXISTS journals;

CREATE DATABASE journals;

USE journals;

CREATE TABLE entries (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  title varchar(25) NOT NULL,
  body varchar(1000) NOT NULL,
  journal_image BLOB,
  PRIMARY KEY (id)
);
