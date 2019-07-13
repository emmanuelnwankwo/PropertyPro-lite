/* eslint-disable camelcase */
import Authenticator from '../helper/authenticator';
import validator from './validator';
import pool from '../config/connection';

const { verifyToken, decodeToken } = Authenticator;
const { checkSignup, checkLogin, checkEmail } = validator;

const header = (req) => {
  const token = req.headers.authorization.split(' ')[1] || req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
  const decoded = decodeToken(token);
  return decoded.payload;
};
/**
 * @description Handles validation for all authentication processes
 */
class AuthValidator {
  /**
   * validates user sign up data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validateSignUp(req, res, next) {
    try {
      const { errors, isValid } = checkSignup(req.body);
      if (!isValid) {
        return res.status(400).json({ status: 'error', error: errors });
      }
    } catch (err) {
      const { error } = err;
      if (error === undefined) {
        return res.status(500).json({
          status: 'error',
          error: 'Invalid Data Input',
        });
      }
    }
    return next();
  }

  /**
   * check if the user exists in the database
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static async userExists(req, res, next) {
    const { email } = req.body;
    const sqlQuery = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    let user;
    const client = await pool.connect();
    try {
      user = await client.query({ text: sqlQuery, values });
      if (user.rows && user.rowCount) {
        return res.status(409).json({
          status: 'error',
          data: `User with email ${email} already exists`,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal Server error',
      });
    } finally {
      client.release();
    }
    return next();
  }

  /**
   * validates phone number in the database
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static async validatePhone(req, res, next) {
    const { phone_number } = req.body;
    const sqlQuery = 'SELECT * FROM users WHERE phone_number = $1';
    const values = [phone_number];
    let user;
    const client = await pool.connect();
    try {
      user = await client.query({ text: sqlQuery, values });
      if (user.rows && user.rowCount) {
        return res.status(409).json({ status: 'error', error: `User with phone number ${phone_number} already exists` });
      }
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal Server Error',
      });
    } finally {
      client.release();
    }
    return next();
  }

  /**
   * check if the user is login
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static isAuthenticated(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1] || req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
      const verifiedToken = verifyToken(token);
      if (!verifiedToken) {
        return res.status(401).json({
          status: 'error',
          error: 'Access denied, Token has expired',
        });
      }
      const decoded = decodeToken(token);
      if (Date.now() >= decoded.payload.exp * 1000) {
        return res.status(401).json({
          status: 'error',
          error: 'Access denied, Token has expired',
        });
      }
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        error: 'Access denied, Authorization required',
      });
    }
    return next();
  }

  /**
   * check if the user is an Agent
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static isAgent(req, res, next) {
    const accountType = header(req).user_type;
    if (accountType.toUpperCase() === 'USER') {
      return res.status(403).json({
        status: 'error',
        error: 'Access denied, Only Agent can perform this action',
      });
    }
    return next();
  }

  /**
   * check if the user is an Admin
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static isAdmin(req, res, next) {
    const Admin = JSON.parse(header(req).is_admin);
    if (!Admin) {
      return res.status(403).json({
        status: 'error',
        error: 'Access denied, contact Admin',
      });
    }
    return next();
  }

  static validateLogin(req, res, next) {
    const { errors, isValid } = checkLogin(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 'error', error: errors });
    }
    return next();
  }

  /**
 * Validates Reset password email
 * @static
 * @param {object} req - request
 * @param {object} res - response
 * @param {object} next - callback
 * @returns
 * @memberof AuthValidator
 */
  static async validatePasswordReset(req, res, next) {
    const { errors, isValid } = checkEmail(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 'error', error: errors });
    }
    const { email } = req.body;
    const sqlQuery = { text: 'SELECT email FROM users WHERE email = $1', values: [email] };
    const client = await pool.connect();
    try {
      const user = await client.query(sqlQuery);
      if (!user.rowCount) {
        return res.status(404).json({ status: 'error', error: `User with email ${email} does not exist` });
      }
    } catch (err) { return res.status(500).json({ status: 'error', error: 'Internal server error' }); } finally { await client.release(); }
    return next();
  }
}

export default AuthValidator;
