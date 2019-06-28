// import Authenticator from '../helper/authenticator';
import UserModel from '../models/dummyModel/userModel';

// const { verifyToken } = Authenticator;

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
    if (email === undefined) {
      return res.status(409).json({
        status: 'error',
        error: 'Email is required',
      });
    }
    if (firstName === undefined || firstName === '') {
      return res.status(409).json({
        status: 'error',
        error: 'First Name is required',
      });
    }
    if (lastName === undefined || lastName === '') {
      return res.status(409).json({
        status: 'error',
        error: 'Last Name is required',
      });
    }
    if (password === undefined || password === '') {
      return res.status(409).json({
        status: 'error',
        error: 'Password is required',
      });
    }
    if (phoneNumber === undefined || phoneNumber === '') {
      return res.status(409).json({
        status: 'error',
        error: 'Phone number is required',
      });
    }
    if (!Number(phoneNumber)) {
      return res.status(409).json({
        status: 'error',
        error: 'Phone number is not an integer',
      });
    }
    if (address === undefined) {
      return res.status(409).json({
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
        error: 'Phone number already exist in the database',
      });
    }
    return next();
  }
}

export default AuthValidator;
