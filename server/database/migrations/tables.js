const users = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL UNIQUE,
    address VARCHAR(30) DEFAULT NULL,
    passportUrl VARCHAR(255) DEFAULT NULL,
    userType VARCHAR(20) NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

export default { users };