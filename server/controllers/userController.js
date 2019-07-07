import passwordHash from 'password-hash';
import Authenticator from '../helper/authenticator';
import pool from '../config/connection';

const { generateToken } = Authenticator;
const defaultImage = 'https://res.cloudinary.com/enwankwo/image/upload/v1562248114/PropertyPro-Lite/avatar.png';
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
    let user;
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
          id, isAdmin, userType, phoneNumber,
        });
        return res.status(201).json({ status: 'success', data: [{ token, user }] });
      }
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
}

export default UserController;
