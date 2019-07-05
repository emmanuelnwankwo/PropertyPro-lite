import express from 'express';
import swaggerUi from 'swagger-ui-express';
import Property from '../controllers/dummyController/propertyController';
import User from '../controllers/dummyController/userController';
import AuthValidator from '../middlewares/authValidator';
import PropertyValidator from '../middlewares/propertyValidator';
import Cloudinary from '../config/cloudinaryConfig';
import Helper from '../helper/helper';

const router = express.Router();
const swaggerDocument = require('../../swagger.json');

const { createUser, loginUser, getAllUsers, deleteUser } = User;
const { imageupload } = Cloudinary;
const {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
  updateProperty,
  markProperty,
  typeProperty,
} = Property;
const {
  validateSignUp,
  userExists,
  validatePhone,
  isAuthenticated,
  isAgent,
  validateLogin,
  isAdmin,
} = AuthValidator;
const { validateProperty, validateSingleProperty } = PropertyValidator;
router.get('/', (req, res) => {
  res.send(Helper.indexTemplate());
});

/** Property Routes */
const propertyUrl = '/api/v1/property';
router.post(`${propertyUrl}`, isAuthenticated, isAgent, validateProperty, createProperty);
router.get(`${propertyUrl}`, isAuthenticated, getProperties);
router.get(`${propertyUrl}/:propertyId`, isAuthenticated, validateSingleProperty, getProperty);
router.get(`${propertyUrl}/search/:propertyType`, isAuthenticated, typeProperty);
router.delete(`${propertyUrl}/:propertyId`, isAuthenticated, isAgent, validateSingleProperty, deleteProperty);
router.put(`${propertyUrl}/:propertyId`, isAuthenticated, isAgent, validateSingleProperty, updateProperty);
router.patch(`${propertyUrl}/:propertyId`, isAuthenticated, isAgent, validateSingleProperty, markProperty);

/** End Property Routes */

/**  authBaseUrl Routes */
const authBaseUrl = '/api/v1/auth';
router.post(`${authBaseUrl}/signup`, validateSignUp, userExists, validatePhone, createUser);
router.post(`${authBaseUrl}/login`, validateLogin, loginUser);

router.get(`${authBaseUrl}/admin`, isAuthenticated, isAdmin, getAllUsers);
router.delete(`${authBaseUrl}/admin/:userId`, isAuthenticated, isAdmin, deleteUser);
/** Image upload in Cloudinary */
router.post('/api/v1/upload', imageupload);

/** Documentation */
router.use('/api/docs', swaggerUi.serve);
router.get('/api/docs', swaggerUi.setup(swaggerDocument));
/** End documentation */

router.get('*', (req, res, next) => {
  res.status(404).json({
    message: 'Endpoint Not Found',
  });
  return next();
});
export default router;
