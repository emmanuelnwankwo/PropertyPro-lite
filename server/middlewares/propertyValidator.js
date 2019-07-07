import PropertyModel from '../models/dummyModel/propertyModel';
import validator from './validator';

const { checkProperty } = validator;
/**
 * @description Handles validation for property
 */
class PropertyValidator {
  /**
   * validates property data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validateProperty(req, res, next) {
    try {
      const { errors, isValid } = checkProperty(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
    } catch (err) {
      const { error } = err;
      if (error === undefined) {
        res.status(500).json({
          status: 'error',
          error: 'Invalid Data Input',
        });
      }
    }
    return next();
  }

  /**
   * validates single property ID
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  static validateSingleProperty(req, res, next) {
    const { propertyId } = req.params;
    const property = PropertyModel.find(
      propert => propert.id === propertyId,
    );
    if (!property) {
      return res.status(404).json({
        status: 'error',
        error: `Property with ID: ${propertyId} NOT FOUND`,
      });
    }
    return next();
  }
}

export default PropertyValidator;
