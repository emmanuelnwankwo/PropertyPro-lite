import debug from 'debug';
import pool from '../../config/connection';

const debugy = debug('migrate:reset');

(async function migrateReset() {
  const client = await pool.connect();
  try {
    debugy('rolling back migrations...');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
  } catch (err) {
    debugy(err);
    return;
  } finally {
    await client.release();
    debugy('roll back completed');
  }
}());
