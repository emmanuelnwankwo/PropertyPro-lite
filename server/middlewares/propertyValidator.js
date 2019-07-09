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

}

export default PropertyValidator;
