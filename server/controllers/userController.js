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
    const passportUrl = req.body.passportUrl || defaultImage;
    const client = await pool.connect();
    try {
      const {
        email, firstName, lastName, password, phoneNumber, address, userType, isAdmin,
      } = req.body;
      const hashedPassword = passwordHash.generate(password);
      const text = `INSERT INTO users(email, firstName, lastName, password, phoneNumber, address, passportUrl, userType, isAdmin)
                              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
                              RETURNING id, email, firstName, lastName, phoneNumber, address, passportUrl, userType, isAdmin`;
      const values = [email, firstName, lastName, hashedPassword, phoneNumber, address, passportUrl, userType, isAdmin];
      user = await client.query({ text, values });
      if (user.rowCount) {
        user = user.rows[0];
        const { id } = user;
        const token = await generateToken({
          id, isAdmin, userType, phoneNumber, email,
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
          const { id, isAdmin, userType, phoneNumber } = user;
          const token = await generateToken({ id, isAdmin, userType, phoneNumber, email });
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
