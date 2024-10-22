-- Create Database
CREATE DATABASE IF NOT EXISTS fauna_link;

USE fauna_link;

-- Animal's Table
CREATE TABLE IF NOT EXISTS animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    end_node_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    species VARCHAR(255),
    description TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GPS Data Table
CREATE TABLE IF NOT EXISTS gps_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    altitude DECIMAL(10, 2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    battery_level FLOAT,
    signal_strength FLOAT,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

-- Alerts Table
CREATE TABLE IF NOT EXISTS alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT,
    alert_type VARCHAR(255),
    description TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);
