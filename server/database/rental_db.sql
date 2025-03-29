CREATE TABLE landlords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
    propertyId INT AUTO_INCREMENT PRIMARY KEY,
    landlord_id INT NOT NULL,
    propertyName VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    initialCost DECIMAL(10,2) NOT NULL,
    unit_count INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    landlord_id INT NOT NULL,
    property_id INT NOT NULL,
    propertyName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    rent_amount DECIMAL(10,2) UNSIGNED NOT NULL CHECK (rent_amount > 0),
    lease_start DATE NOT NULL,
    lease_end DATE CHECK (lease_end > lease_start),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (landlord_id) REFERENCES landlords(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX (property_id)
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    landlord_id INT NOT NULL,
    property_id INT NOT NULL,
    amount DECIMAL(10,2) UNSIGNED NOT NULL CHECK (amount > 0),
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    transaction_id VARCHAR(255) UNIQUE,
    payment_method ENUM('M-Pesa', 'Paystack', 'Cash') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (landlord_id) REFERENCES landlords(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX (tenant_id),
    INDEX (landlord_id),
    INDEX (property_id)
);

CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    landlord_id INT NOT NULL,
    property_id INT NOT NULL,
    invoice_number VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10,2) UNSIGNED NOT NULL CHECK (amount > 0),
    status ENUM('unpaid', 'paid') DEFAULT 'unpaid',
    due_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (landlord_id) REFERENCES landlords(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX (tenant_id),
    INDEX (property_id)
);

CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Landlord', 'Tenant') DEFAULT 'Tenant'
);



SELECT IFNULL(SUM(amount), 0) AS total_revenue 
FROM payments 
WHERE status = 'completed';

SELECT IFNULL(SUM(amount), 0) AS total_unpaid 
FROM invoices 
WHERE status = 'unpaid';

SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(amount) AS monthly_revenue
FROM payments
WHERE status = 'completed' AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY month
ORDER BY month DESC;

SELECT payment_method, COUNT(*) AS count 
FROM payments 
GROUP BY payment_method 
ORDER BY count DESC;

SELECT t.name AS tenant_name, SUM(p.amount) AS total_paid
FROM payments p
JOIN tenants t ON p.tenant_id = t.id
WHERE p.status = 'completed'
GROUP BY p.tenant_id
ORDER BY total_paid DESC
LIMIT 5;
