import Authenticator from '../helper/authenticator';
import UserModel from '../models/dummyModel/userModel';

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
    const {
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      address,
    } = req.body;
    if (!email) {
      return res.status(400).json({
        status: 'error',
        error: 'Email is required',
      });
    }
    if (!firstName) {
      return res.status(400).json({
        status: 'error',
        error: 'First Name is required',
      });
    }
    if (!lastName) {
      return res.status(400).json({
        status: 'error',
        error: 'Last Name is required',
      });
    }
    if (!password) {
      return res.status(400).json({
        status: 'error',
        error: 'Password is required',
      });
    }
    if (!phoneNumber) {
      return res.status(400).json({
        status: 'error',
        error: 'Phone number is required',
      });
    }
    if (!Number(phoneNumber)) {
      return res.status(404).json({
        status: 'error',
        error: 'Phone number is not an integer',
      });
    }
    if (!address) {
      return res.status(400).json({
        status: 'error',
        error: 'Address is required',
      });
    }
    return next();
  }

  /**
   * check if the user exists in the database
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static userExists(req, res, next) {
    const { email } = req.body;
    const userEmail = UserModel.find(
      selectedUser => selectedUser.email === email,
    );
    if (userEmail) {
      return res.status(409).json({
        status: 'error',
        error: 'User already exist',
      });
    }
    return next();
  }

  /**
   * validates phone number in the database
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validatePhone(req, res, next) {
    const { phoneNumber } = req.body;
    const userPhone = UserModel.find(
      selectedUser => selectedUser.phoneNumber === phoneNumber,
    );
    if (userPhone) {
      return res.status(409).json({
        status: 'error',
        error: 'User with the phone number already exists',
      });
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
      const token = req.headers.authorization.split(' ')[1];
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
    const token = req.headers.authorization.split(' ')[1];
    const decoded = decodeToken(token);
    const accountType = decoded.payload.userType;
    if (accountType === 'user') {
      return res.status(403).json({
        status: 'error',
        error: 'Only Agent can post an advert',
      });
    }
    return next();
  }
}

export default AuthValidator;
