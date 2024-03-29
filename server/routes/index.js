import express from 'express';
import swaggerUi from 'swagger-ui-express';
import Property from '../controllers/propertyController';
import User from '../controllers/userController';
import authValidator from '../middlewares/authValidator';
import PropertyValidator from '../middlewares/propertyValidator';
import Cloudinary from '../config/cloudinaryConfig';
import PasswordResetController from '../controllers/passwordResetController';

const router = express.Router();
const swaggerDocument = require('../../swagger.json');

const {
  createUser, loginUser, getAllUsers, deleteUser,
} = User;
const { imageupload } = Cloudinary;
const {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
  updateProperty,
  markProperty,
  getPropertiesByAgent,
} = Property;
const { AuthValidator } = authValidator;
const {
  validateSignUp,
  userExists,
  validatePhone,
  isAuthenticated,
  isAgent,
  validateLogin,
  isAdmin,
  validatePasswordReset,
  validateToken,
} = AuthValidator;
const { validateProperty } = PropertyValidator;
const { resetPassword, passwordReset, resetPasswordForm } = PasswordResetController;
router.get('/', (req, res) => {
  return res.redirect('https://propertypro-lit.herokuapp.com/api/docs');
});

/** Property Routes */
const propertyUrl = '/api/v1/property';
router.post(`${propertyUrl}`, isAuthenticated, isAgent, validateProperty, createProperty);
router.get(`${propertyUrl}`, isAuthenticated, getProperties);
router.get(`${propertyUrl}/:propertyId`, isAuthenticated, getProperty);
router.get(`${propertyUrl}?type=propertyType`, isAuthenticated, getProperties);
router.delete(`${propertyUrl}/:propertyId`, isAuthenticated, isAgent, deleteProperty);
router.patch(`${propertyUrl}/:propertyId`, isAuthenticated, isAgent, updateProperty);
router.patch(`${propertyUrl}/:propertyId/sold`, isAuthenticated, isAgent, markProperty);

/** End Property Routes */

/**  authBaseUrl Routes */
const authBaseUrl = '/api/v1/auth';
router.post(`${authBaseUrl}/signup`, validateSignUp, userExists, createUser);
router.post(`${authBaseUrl}/signin`, validateLogin, loginUser);
router.post(`${authBaseUrl}/:userEmail/reset_password`, validatePasswordReset, passwordReset);
router.get('/password/reset/:token', resetPasswordForm);
router.post('/password/reset', resetPassword);

router.get('/api/v1/admin', isAuthenticated, isAdmin, getAllUsers);
router.delete('/api/v1/admin/:userId', isAuthenticated, isAdmin, deleteUser);
router.get('/api/v1/agent', isAuthenticated, isAgent, getPropertiesByAgent);
router.post('/api/v1/token', validateToken);
/** Image upload in Cloudinary */
// router.post('/api/v1/upload', imageupload);
// router.post('/api/v1/upload', upload, (req, res) => {
//   console.log(req.files);
//   // console.log(req);
//   console.log(res);
// });

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
