import passwordHash from 'password-hash';
import uuid from 'uuid';
import UserModel from '../../models/dummyModel/userModel';
import Authenticator from '../../helper/authenticator';

const { generateToken } = Authenticator;
const defaultImage = 'https://res.cloudinary.com/enwankwo/image/upload/v1562248114/PropertyPro-Lite/avatar.png';
class UserController {
  static createUser(req, res) {
    const {
      email, firstName, lastName, password, phoneNumber, address, userType, isAdmin,
    } = req.body;
    const passportUrl = req.body.passportUrl || defaultImage;
    const hashedPassword = passwordHash.generate(password);
    const user = {
      id: uuid.v4(), email, firstName, lastName, hashedPassword, phoneNumber, address, passportUrl, userType, isAdmin,
    };
    UserModel.push(user);
    const { id } = user;
    const token = generateToken({
      id, isAdmin, userType, phoneNumber,
    });
    return res.status(201).json({
      status: 'success',
      data: [{
        token, id, email, firstName, lastName, phoneNumber, address, passportUrl, userType, isAdmin,
      }],
    });
  }

  static loginUser(req, res) {
    const { email } = req.body;
    const user = UserModel.filter(selectedUser => selectedUser.email === email);
    const {
      id, isAdmin, firstName, lastName, phoneNumber, address, passportUrl, userType,
    } = user[0];
    const token = generateToken({
      id, isAdmin, userType, phoneNumber,
    });
    return res.status(200).json({
      status: 'success',
      data: [{
        token, id, email, firstName, lastName, phoneNumber, address, passportUrl, userType, isAdmin,
      }],
      message: 'Login successful',
    });
  }

  static getAllUsers(req, res) {
    if (UserModel.length === 0) {
      return res.status(404).json({
        status: 'error',
        error: 'No User Found',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: UserModel,
    });
  }

  static deleteUser(req, res) {
    const { userId } = req.params;
    const user = UserModel.find(
      selectedUser => selectedUser.id === userId,
    );
    const index = UserModel.indexOf(user);
    UserModel.splice(index, 1);
    return res.status(200).json({
      status: 'success',
      data: `User with ID: ${userId} deleted`,
    });
  }
}

export default UserController;
