DROP DATABASE IF EXISTS finals;
CREATE DATABASE finals;

USE finals;

CREATE TABLE  note (
  id INT AUTO_INCREMENT PRIMARY KEY,
  output_text TEXT ,
  encrypted_text TEXT ,
  cipher INT ,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
