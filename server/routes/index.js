import express from 'express';
import Property from '../controllers/dummyController/propertyController';
import User from '../controllers/dummyController/userController';
import AuthValidator from '../middlewares/authValidator';

const router = express.Router();

const { createUser, loginUser } = User;
const {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
  updateProperty,
  markProperty,
  typeProperty,
} = Property;
const { validateSignUp, userExists, validatePhone } = AuthValidator;

router.get('/', (req, res) => {
  res.send('Welcome to PropertyPro-Lite');
});

/** Property Routes */
const propertyUrl = '/api/v1/property';
router.post(`${propertyUrl}`, createProperty);
router.get(`${propertyUrl}`, getProperties);
router.get(`${propertyUrl}/:propertyId`, getProperty);
router.get(`${propertyUrl}/search/:propertyType`, typeProperty);
router.delete(`${propertyUrl}/:propertyId`, deleteProperty);
router.put(`${propertyUrl}/:propertyId`, updateProperty);
router.patch(`${propertyUrl}/:propertyId`, markProperty);

/** End Property Routes */

/**  authBaseUrl Routes */
const authBaseUrl = '/api/v1/auth';
router.post(
  `${authBaseUrl}/signup`,
  validateSignUp,
  validatePhone,
  userExists,
  createUser,
);
router.post(`${authBaseUrl}/login`, loginUser);

export default router;
