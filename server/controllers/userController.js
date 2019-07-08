/* eslint-disable camelcase */
import passwordHash from 'password-hash';
import Authenticator from '../helper/authenticator';
import pool from '../config/connection';

const { generateToken } = Authenticator;
const defaultImage = 'https://res.cloudinary.com/enwankwo/image/upload/v1562248114/PropertyPro-Lite/avatar.png';
let user;
/**
 * Defines methods for users
 * @class UserController
 */
class UserController {
  /**
     * Creates a user
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns
     * @memberof UserController
     */
  static async createUser(req, res) {
    const passport_url = req.body.passport_url || defaultImage;
    const client = await pool.connect();
    try {
      const {
        email, first_name, last_name, password, phone_number, address, user_type, is_admin,
      } = req.body;
      const hashedPassword = passwordHash.generate(password);
      const text = `INSERT INTO users(email, first_name, last_name, password, phone_number, address, passport_url, user_type, is_admin)
                              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
                              RETURNING id, email, first_name, last_name, phone_number, address, passport_url, user_type, is_admin`;
      const values = [email, first_name, last_name, hashedPassword, phone_number, address, passport_url, user_type, is_admin];
      user = await client.query({ text, values });
      if (user.rowCount) {
        user = user.rows[0];
        const { id } = user;
        const token = await generateToken({
          id, is_admin, user_type, phone_number, email,
        });
        return res.status(201).json({ status: 'success', data: [{ token, user }] });
      }
    } catch (err) {
      const { constraint } = err;
      if (constraint === 'users_email_key') {
        return res.status(409).json({ status: 'error', error: 'User already exists' });
      }
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }

  /**
     * sign in a user
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns user object
     * @memberof UserController
     */
  static async loginUser(req, res) {
    const { email, password } = req.body;
    const sqlQuery = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const client = await pool.connect();
    try {
      user = await client.query({ text: sqlQuery, values });
      if (user.rows && user.rowCount) {
        user = user.rows[0];
        if (passwordHash.verify(password, user.password)) {
          const { id, is_admin, user_type, phone_number } = user;
          const token = await generateToken({ id, is_admin, user_type, phone_number, email });
          return res.status(200).json({ status: 'Login successful', data: [{ token, user }] });
        }
        return res.status(401).json({ status: 'error', error: 'Password is not correct' });
      }
      return res.status(404).json({ status: 'error', error: 'User does not exists' });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }
}

export default UserController;
