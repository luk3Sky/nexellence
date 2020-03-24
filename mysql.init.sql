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

CREATE TABLE IF NOT EXISTS period (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS course (
    id VARCHAR(32) PRIMARY KEY,
    code VARCHAR(20),
    name  VARCHAR(200),
    credits INTEGER,
    period_id VARCHAR(32) REFERENCES period(id) ON DELETE CASCADE,
    teacher_id VARCHAR(32) REFERENCES teacher(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS enrollment (
    id VARCHAR(32) PRIMARY KEY,
    course_id VARCHAR(32) REFERENCES course(id) ON DELETE CASCADE,
    student_id VARCHAR(32) REFERENCES student(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX indx_enrollment ON enrollment (course_id, student_id);