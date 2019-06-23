import express from 'express';
import Property from '../controllers/dummyController/propertyController';

const router = express.Router();

const {
   getProperties
} = Property;

router.get('/', (req, res) => {
  res.send('Welcome to PropertyPro-Lite');
});

/** Property Routes */
const propertyUrl = '/api/v1/property';
router.get(`${propertyUrl}`, getProperties);

/** End Property Routes */


export default router;
