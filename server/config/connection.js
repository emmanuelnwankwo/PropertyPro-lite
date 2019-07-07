import { Pool } from 'pg';
import dbConfig from './dbConfig';

const { dbEnv, production } = dbConfig;
const connectionString = production;
const ssl = dbEnv === 'production';
const pool = new Pool({
  connectionString,
  ssl,
});

export default pool;
