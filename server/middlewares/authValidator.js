/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Authenticator from '../helper/authenticator';
import validator from './validator';
import pool from '../config/connection';

dotenv.config();
const { SECRET } = process.env;
const { verifyToken, decodeToken } = Authenticator;
const { checkSignup, checkLogin } = validator;

const header = (req) => {
  const token = req.headers.authorization.split(' ')[1] || req.headers.authorization || req.headers['x-access-token'] || req.headers.token || req.body.token;
  return token;
};
let user;
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
        return res.status(400).json({ status: 400, error: errors });
      }
    } catch (err) {
      const { error } = err;
      if (error === undefined) {
        return res.status(500).json({
          status: 500,
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
    const client = await pool.connect();
    try {
      user = await client.query({ text: sqlQuery, values });
      if (user.rows && user.rowCount) {
        return res.status(409).json({
          status: 409,
          error: `User with email ${email} already exists`,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
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
    const client = await pool.connect();
    try {
      user = await client.query({ text: sqlQuery, values });
      if (user.rows && user.rowCount) {
        return res.status(409).json({ status: 'error', error: `User with phone number ${phone_number} already exists` });
      }
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: err.message,
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
      const token = header(req);
      const verifiedToken = verifyToken(token);
      if (!verifiedToken) {
        return res.status(401).json({
          status: 401,
          error: 'Access denied, Token has expired',
        });
      }
      const decoded = decodeToken(token);
      if (Date.now() >= decoded.payload.exp * 1000) {
        return res.status(401).json({
          status: 401,
          error: 'Access denied, Token has expired',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
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
    const token = header(req);
    const decoded = decodeToken(token);
    const accountType = decoded.payload.user_type;
    if (accountType.toUpperCase() === 'USER') {
      return res.status(403).json({
        status: 403,
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
    const token = header(req);
    const decoded = decodeToken(token);
    const Admin = JSON.parse(decoded.payload.is_admin);
    if (!Admin) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied, contact Admin',
      });
    }
    return next();
  }

  static validateLogin(req, res, next) {
    const { errors, isValid } = checkLogin(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, error: errors });
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
    const { userEmail } = req.params;
    const sqlQuery = { text: 'SELECT email FROM users WHERE email = $1', values: [userEmail] };
    const client = await pool.connect();
    try {
      user = await client.query(sqlQuery);
      if (!user.rowCount) {
        return res.status(404).json({ status: 404, error: `User with email ${userEmail} does not exist` });
      }
    } catch (err) { return res.status(500).json({ status: 500, error: err.message }); } finally { await client.release(); }
    return next();
  }
  
  static validateToken(req, res) {
    const { token } = req.body;
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ status: 401, error: err.message });
      return res.status(200).json({ status: 200, data: decoded });
    });
  }
}

export default { AuthValidator, header };
