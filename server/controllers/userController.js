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
      const text = `INSERT INTO users(email, first_name, last_name, password, phone_number, address, passport_url, user_type)
                              VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                              RETURNING id, email, first_name, last_name, phone_number, address, passport_url, user_type, is_admin`;
      const values = [email, first_name, last_name, hashedPassword, phone_number, address, passport_url, user_type];
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
          const {
            id, is_admin, user_type, phone_number,
          } = user;
          const token = await generateToken({
            id, is_admin, user_type, phone_number, email,
          });
          return res.status(200).json({ status: 'Login successful', data: { token, user } });
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

  /**
     * Get all Users by Admin
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns user object
     * @memberof UserController
     */
  static async getAllUsers(req, res) {
    const sqlQuery = `SELECT id, email, first_name, last_name, password, phone_number, address, passport_url, user_type, is_admin, created_on
                    FROM users ORDER BY created_on DESC`;
    const client = await pool.connect();
    try {
      user = await client.query(sqlQuery);
      return res.status(200).json({ status: 'success', data: user.rows });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }

  /**
     * Delete a User by Admin
     * @static
     * @param {object} req - request
     * @param {object} res - response
     * @returns user object
     * @memberof UserController
     */
  static async deleteUser(req, res) {
    const { userId } = req.params;
    const deleteQuery = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const client = await pool.connect();
    try {
      user = await client.query(deleteQuery, [userId]);
      if (!user.rows[0]) {
        return res.status(404).json({ status: 'error', error: 'User Not Found' });
      }
      return res.status(200).json({ status: 'success', data: `User with ID: ${userId} deleted` });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    } finally {
      await client.release();
    }
  }
}

export default UserController;
