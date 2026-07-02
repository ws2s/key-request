CREATE DATABASE IF NOT EXISTS itemsdb;
USE itemsdb;

CREATE TABLE IF NOT EXISTS Items (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200) NOT NULL,
    Description VARCHAR(1000) NULL,
    Price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT UTC_TIMESTAMP()
);

-- Sample rows (optional)
INSERT INTO Items (Name, Description, Price) VALUES
    ('Sample Widget', 'A basic widget', 9.99),
    ('Sample Gadget', 'A slightly fancier gadget', 24.50);
