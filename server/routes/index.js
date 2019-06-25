import express from 'express';
import Property from '../controllers/dummyController/propertyController';

const router = express.Router();

const {
  createProperty, getProperties, getProperty, deleteProperty, updateProperty, markProperty, typeProperty,
} = Property;

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


export default router;
