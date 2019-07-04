/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './is-empty';
// Credit: https://stackoverflow.com/questions/16299036/to-check-if-a-string-is-alphanumeric-in-javascript
const regex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
const checkLogin = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
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
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = checkLogin;
