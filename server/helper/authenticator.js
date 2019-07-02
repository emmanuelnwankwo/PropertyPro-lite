import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { SECRET } = process.env;

/**
 * Handles access token generation and verification
 */
class Authenticator {
  /**
     * @description Handles access token generation
     * @param {object} payload - The user credential {id, is_admin}
     * @return {string} access token
     */
  static generateToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: '24h' });
  }

  /**
     * @description Verify the access token
     * @param {string} token - The access token
     * @return {object} payload - The verify access token
     */
  static verifyToken(token) {
    return jwt.verify(token, SECRET);
  }

  /**
     * @description Decodes the access token
     * @param {string} token - The access token
     * @return {object} payload - The decoded access token
     */
  static decodeToken(token) {
    return jwt.decode(token, { complete: true });
  }
}

export default Authenticator;
