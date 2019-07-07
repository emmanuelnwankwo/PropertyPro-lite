import passwordHash from 'password-hash';
import pool from '../config/connection';

class UserModel {
  static async create(req, res) {
    const client = await pool.connect();
    let user;
    try {
      const {
        email, firstName, lastName, password, phoneNumber, address, passportUrl, userType, isAdmin,
      } = req.body;
      const hashedPassword = passwordHash.generate(password);
      const text = `INSERT INTO users(email, firstName, lastName, password, phoneNumber, address, passportUrl, userType, isAdmin)
                          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
                          RETURNING id, email, firstName, lastName, phoneNumber, address, passportUrl, userType, isAdmin`;
      const values = [email, firstName, lastName, hashedPassword, phoneNumber, address, passportUrl, userType, isAdmin];
      user = await client.query({ text, values });
      return user;
    } catch (err) {
      const { constraint } = err;
      if (constraint === 'users_email_key') {
        return res.status(409).json({ status: 'error', error: 'User already exists' });
      }
      return res.status(500).json({ status: 'error', error: 'Internal Server error' });
    } finally {
      await client.release();
    }
  }

  static async getUser(colomn, value, res) {
    const text = `SELECT * FROM users WHERE ${colomn} = $1`;
    const values = [value];
    let user;
    const client = await pool.connect();
    try {
      user = await client.query({ text, values });
      if (user.rows && user.rowCount) {
        return user.rows[0];
      }
      return null;
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server error' });
    } finally {
      await client.release();
    }
  }
}

export default UserModel;
