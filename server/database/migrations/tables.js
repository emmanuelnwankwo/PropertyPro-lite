const users = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL UNIQUE,
    address VARCHAR(100) DEFAULT NULL,
    passportUrl VARCHAR(255) DEFAULT NULL,
    userType VARCHAR(20) NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const properties = `CREATE TABLE IF NOT EXISTS properties (
                    id SERIAL PRIMARY KEY,
                    owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    propertyName VARCHAR(255) NOT NULL,
                    status VARCHAR(10) DEFAULT 'available',
                    type VARCHAR(20) NOT NULL,
                    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    state VARCHAR(20) NOT NULL,
                    city VARCHAR(30) NOT NULL,
                    address VARCHAR(255) NOT NULL,
                    price FLOAT NOT NULL,
                    imageUrl VARCHAR(255) NOT NULL,
                    imageUrl2 VARCHAR(255) DEFAULT NULL,
                    imageUrl3 VARCHAR(255) DEFAULT NULL,
                    ownerEmail VARCHAR(100) NOT NULL,
                    ownerPhone VARCHAR(15) NOT NULL,
                    purpose VARCHAR(10) NOT NULL,
                    description TEXT NOT NULL,
                    mapLat VARCHAR(100) DEFAULT NULL,
                    mapLng VARCHAR(100) DEFAULT NULL
                    )`;

export default { users, properties };
