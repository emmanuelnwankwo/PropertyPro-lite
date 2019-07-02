import passwordHash from 'password-hash';
import uuid from 'uuid';
import UserModel from '../../models/dummyModel/userModel';
import Authenticator from '../../helper/authenticator';

const { generateToken } = Authenticator;
class UserController {
  static createUser(req, res) {
    try {
      const {
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        address,
        userType,
        isAdmin,
      } = req.body;
      const hashedPassword = passwordHash.generate(password);
      const user = {
        id: uuid.v4(),
        email,
        firstName,
        lastName,
        hashedPassword,
        phoneNumber,
        address,
        userType,
        isAdmin,
      };
      UserModel.push(user);
      const { id } = user;
      const token = generateToken({
        id, isAdmin, userType, phoneNumber,
      });
      return res.status(201).json({
        status: 'success',
        data: [
          {
            token,
            id,
            email,
            firstName,
            lastName,
            phoneNumber,
            address,
            userType,
            isAdmin,
          },
        ],
      });
    } catch (err) {
      const { error } = err;
      if (error === undefined) {
        return res.status(500).json({
          status: 'error',
          error: 'Invalid data input',
        });
      }
    }
    return true;
  }

  static loginUser(req, res) {
    const { email, password } = req.body;
    const user = UserModel.filter(selectedUser => selectedUser.email === email);
    try {
      if (user && user[0]) {
        if (passwordHash.verify(password, user[0].hashedPassword)) {
          const {
            id,
            isAdmin,
            firstName,
            lastName,
            phoneNumber,
            address,
            userType,
          } = user[0];
          const token = generateToken({
            id, isAdmin, userType, phoneNumber,
          });
          return res.status(200).json({
            status: 'success',
            data: [
              {
                token,
                id,
                email,
                firstName,
                lastName,
                phoneNumber,
                address,
                userType,
                isAdmin,
              },
            ],
            message: 'Login successful',
          });
        }
        return res.status(401).json({
          status: 'error',
          error: 'Password is not correct',
        });
      }
      return res.status(404).json({
        status: 'error',
        error: 'User does not exists',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  // static getUsers(req, res) {
  //     return res.status(200).json({
  //         status: 'success',
  //         data: UserModel,
  //     });
  // }
}

export default UserController;
