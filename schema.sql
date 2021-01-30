DROP DATABASE IF EXISTS journals;

CREATE DATABASE journals;

USE journals;

CREATE TABLE entries (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(25) NOT NULL,
  title varchar(255) NOT NULL,
  blog varchar(1000) NOT NULL,
  journal_image BLOB NOT NULL,
  time_stamp varchar(100) NOT NULL,
  -- quote varchar(255) NOT NULL,
  -- weather varchar(100) NOT NULL,
  -- mood varchar(255) NOT NULL,
  -- comments varchar(255) NOT NULL,

  PRIMARY KEY (id)
);

INSERT into entries (username, title, body, journal_image, time_stamp) VALUES ("ian549", "sunday morning blues", "I've been feeling up this morning", "https://pbs.twimg.com/media/EmdsOxSXEAE224X.jpg", "saturday, Jan 30th,2021");
