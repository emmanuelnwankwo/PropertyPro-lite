/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './is-empty';

const checkProperty = (data) => {
  const errors = {};
  data.propertyName = !isEmpty(data.propertyName) ? data.propertyName : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.type = !isEmpty(data.type) ? data.type : '';
  data.purpose = !isEmpty(data.purpose) ? data.purpose : '';
  data.imageUrl = !isEmpty(data.imageUrl) ? data.imageUrl : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  if (Validator.isEmpty(data.propertyName)) {
    errors.propertyName = 'The property name is required';
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = 'The property status is required';
  }
  if (Validator.isFloat(data.price)) {
    errors.price = 'The property price must be a float';
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = 'The property price is required';
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = 'The property state is required';
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = 'The property city is required';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'The property address is required';
  }
  if (Validator.isEmpty(data.type)) {
    errors.type = 'The property type is required';
  }
  if (Validator.isEmpty(data.purpose)) {
    errors.purpose = 'The property purpose is required';
  }
  if (Validator.isEmpty(data.imageUrl)) {
    errors.imageUrl = 'The property image is required';
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'The property description is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = checkProperty;
