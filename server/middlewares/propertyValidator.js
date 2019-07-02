import PropertyModel from '../models/dummyModel/propertyModel';

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
    const {
      status,
      price,
      state,
      city,
      address,
      type,
      imageUrl,
      propertyName,
      description,
      purpose,
    } = req.body;
    if (!propertyName) {
      return res.status(400).json({
        status: 'error',
        error: 'The property name is required',
      });
    }
    if (!status) {
      return res.status(400).json({
        status: 'error',
        error: 'The property status is required',
      });
    }
    if (!price) {
      return res.status(400).json({
        status: 'error',
        error: 'The property price is required',
      });
    }
    if (!state) {
      return res.status(400).json({
        status: 'error',
        error: 'The property state is required',
      });
    }
    if (!city) {
      return res.status(400).json({
        status: 'error',
        error: 'The property city is required',
      });
    }
    if (!address) {
      return res.status(400).json({
        status: 'error',
        error: 'The property address is required',
      });
    }
    if (!type) {
      return res.status(400).json({
        status: 'error',
        error: 'The property type is required',
      });
    }
    if (!purpose) {
      return res.status(400).json({
        status: 'error',
        error: 'The property purpose is required',
      });
    }
    if (!imageUrl) {
      return res.status(400).json({
        status: 'error',
        error: 'The property image is required',
      });
    }
    if (!description) {
      return res.status(400).json({
        status: 'error',
        error: 'The property description is required',
      });
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
