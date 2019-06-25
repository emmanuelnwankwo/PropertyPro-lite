import express from 'express';
import Property from '../controllers/dummyController/propertyController';

const router = express.Router();

const {
  createProperty, getProperties, getProperty, deleteProperty, updateProperty
} = Property;

router.get('/', (req, res) => {
  res.send('Welcome to PropertyPro-Lite');
});

/** Property Routes */
const propertyUrl = '/api/v1/property';
router.post(`${propertyUrl}`, createProperty);
router.get(`${propertyUrl}`, getProperties);
router.get(`${propertyUrl}/:propertyId`, getProperty);
router.delete(`${propertyUrl}/:propertyId`, deleteProperty);
router.put(`${propertyUrl}/:propertyId`, updateProperty);

/** End Property Routes */


export default router;
