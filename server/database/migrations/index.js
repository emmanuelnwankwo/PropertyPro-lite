import debug from 'debug';
import pool from '../../config/connection';
import tables from './tables';

const debugy = debug('migration');
(async function migrate() {
  debugy('migrating...');
  const client = await pool.connect();
  try {
    debugy('migrating users..');
    await client.query(tables.users);
    
    debugy('migrating properties..');
    await client.query(tables.properties);
  } catch (err) {
    debugy(err);
  } finally {
    await client.release();
    debugy('migration completed');
  }
}());
