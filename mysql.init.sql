CREATE DATABASE IF NOT EXISTS Nexcellence;
USE Nexcellence;
-- select length(md5(uuid()));

-- Table Creation
CREATE TABLE IF NOT EXISTS student (
    id VARCHAR(32),
	first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    zip VARCHAR(8),
    dob DATE,
    phone VARCHAR(20),
    mobile_phone VARCHAR(20),
    email VARCHAR(200),
    pic VARCHAR(255),
    registration TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS teacher (
    id VARCHAR(32),
	first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    zip VARCHAR(8),
    title VARCHAR(255),
    phone VARCHAR(20),
    mobile_phone VARCHAR(20),
    email VARCHAR(200),
    pic VARCHAR(255),
    PRIMARY KEY (id)
);