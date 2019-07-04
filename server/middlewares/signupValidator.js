/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './is-empty';

// Credit: https://stackoverflow.com/questions/16299036/to-check-if-a-string-is-alphanumeric-in-javascript
const regex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
const checkSignup = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
  data.userType = !isEmpty(data.userType) ? data.userType : '';
  data.isAdmin = !isEmpty(data.isAdmin) ? data.isAdmin : '';
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is not valid. Enter a valid email';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (!regex.test(data.password)) {
    errors.password = 'Your Password must contain atleast 2 numbers and letter';
  }
  if (!Validator.isLength(data.password, { min: 8 })) {
    errors.password = 'Your Password must be up to 8 digits';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name is required';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name is required';
  }
  if (!Validator.isLength(data.phoneNumber, { min: 11 })) {
    errors.phoneNumber = 'Your Phone number must be up to 11 digits';
  }
  if (!Validator.isNumeric(data.phoneNumber)) {
    errors.phoneNumber = 'Phone number is not valid';
  }
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'Phone number is required';
  }
  if (Validator.isEmpty(data.userType)) {
    errors.userType = 'UserType is required';
  }
  if (!Validator.isBoolean(data.isAdmin)) {
    errors.isAdmin = 'IsAdmin must be a Boolean';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = checkSignup;
