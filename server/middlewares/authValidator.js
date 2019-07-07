import passwordHash from 'password-hash';
import Authenticator from '../helper/authenticator';
import UserModel from '../models/dummyModel/userModel';
import checkLogin from './loginValidator';
import checkSignup from './signupValidator';
import pool from '../config/connection';

const { verifyToken, decodeToken } = Authenticator;

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
        return res.status(400).json(errors);
      }
    } catch (err) {
      const { error } = err;
      if (error === undefined) {
        res.status(500).json({
          status: 'error',
          error: 'Invalid data input',
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
    const { phoneNumber } = req.body;
    const sqlQuery = 'SELECT * FROM users WHERE phoneNumber = $1';
    const values = [phoneNumber];
    let user;
    const client = await pool.connect();
    try {
      user = await client.query({ text: sqlQuery, values });
      if (user.rows && user.rowCount) {
        return res.status(409).json({ status: 'error', error: `User with phone number ${phoneNumber} already exists` });
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
   * check if the user is login
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static isAuthenticated(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
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
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const decoded = decodeToken(token);
    const accountType = decoded.payload.userType;
    if (accountType.toUpperCase() === 'USER') {
      return res.status(403).json({
        status: 'error',
        error: 'Only Agent can post an advert',
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
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const decoded = decodeToken(token);
    const Admin = JSON.parse(decoded.payload.isAdmin);
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
      return res.status(400).json(errors);
    }
    return next();
    // const { email, password } = req.body;
    // const user = UserModel.filter(selectedUser => selectedUser.email === email);
    // if (user && user[0]) {
    //   if (passwordHash.verify(password, user[0].hashedPassword)) {
    //     return next();
    //   }
    //   return res.status(401).json({
    //     status: 'error',
    //     error: 'Password is not correct',
    //   });
    // }
    // return res.status(404).json({
    //   status: 'error',
    //   error: 'User does not exists',
    // });
  }
}

export default AuthValidator;
