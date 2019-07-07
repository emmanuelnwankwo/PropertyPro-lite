import dotenv from 'dotenv';

dotenv.config();
const {
  DB_TEST, DB_DEV, DATABASE_URL, NODE_ENV,
} = process.env;

const dbConfig = {
  test: DB_TEST,
  development: DB_DEV,
  production: DATABASE_URL,
  dbEnv: NODE_ENV || 'development',
};

export default dbConfig;
