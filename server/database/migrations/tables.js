const users = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    address VARCHAR(100) DEFAULT NULL,
    passport_url VARCHAR(255) DEFAULT NULL,
    user_type VARCHAR(20) DEFAULT 'user',
    is_admin BOOLEAN DEFAULT false,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const properties = `CREATE TABLE IF NOT EXISTS properties (
                    id SERIAL PRIMARY KEY,
                    owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    property_name VARCHAR(255) DEFAULT NULL,
                    status VARCHAR(10) DEFAULT 'available',
                    type VARCHAR(20) NOT NULL,
                    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    state VARCHAR(20) NOT NULL,
                    city VARCHAR(30) NOT NULL,
                    address VARCHAR(255) NOT NULL,
                    price FLOAT NOT NULL,
                    image_url VARCHAR(255) DEFAULT NULL,
                    image_url_2 VARCHAR(255) DEFAULT NULL,
                    image_url_3 VARCHAR(255) DEFAULT NULL,
                    owner_email VARCHAR(100) NOT NULL,
                    owner_phone VARCHAR(15) NOT NULL,
                    purpose VARCHAR(10) DEFAULT NULL,
                    description TEXT DEFAULT NULL,
                    map_lat VARCHAR(100) DEFAULT NULL,
                    map_lng VARCHAR(100) DEFAULT NULL
                    )`;

export default { users, properties };
