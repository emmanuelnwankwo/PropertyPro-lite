import express from 'express';
import Property from '../controllers/dummyController/propertyController';
import User from '../controllers/dummyController/userController';
import AuthValidator from '../middlewares/authValidator';
import PropertyValidator from '../middlewares/propertyValidator';

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
const {
  validateSignUp,
  userExists,
  validatePhone,
  isAuthenticated,
  isAgent,
} = AuthValidator;
const { validateProperty, validateSingleProperty } = PropertyValidator;
router.get('/', (req, res) => {
  res.send('Welcome to PropertyPro-Lite');
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
router.post(`${authBaseUrl}/login`, loginUser);

export default router;
