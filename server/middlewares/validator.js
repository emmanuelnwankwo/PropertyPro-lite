/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './is-empty';

// Credit: https://stackoverflow.com/questions/16299036/to-check-if-a-string-is-alphanumeric-in-javascript
const regex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
const checkSignup = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';
  data.user_type = !isEmpty(data.user_type) ? data.user_type : '';
  data.is_admin = !isEmpty(data.is_admin) ? data.is_admin : '';
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
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = 'First Name is required';
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = 'Last Name is required';
  }
  if (!Validator.isLength(data.phone_number, { min: 11 })) {
    errors.phone_number = 'Your Phone number must be up to 11 digits';
  }
  if (!Validator.isNumeric(data.phone_number)) {
    errors.phone_number = 'Phone number is not valid';
  }
  if (Validator.isEmpty(data.phone_number)) {
    errors.phone_number = 'Phone number is required';
  }
  if (Validator.isEmpty(data.user_type)) {
    errors.user_type = 'UserType is required';
  }
  if (!Validator.isBoolean(data.is_admin)) {
    errors.is_admin = 'IsAdmin must be a Boolean';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

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

const checkEmail = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is not valid. Enter a valid email';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const checkProperty = (data) => {
  const errors = {};
  // data.property_name = !isEmpty(data.property_name) ? data.property_name : '';
  // data.status = !isEmpty(data.status) ? data.status : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.type = !isEmpty(data.type) ? data.type : '';
  // data.purpose = !isEmpty(data.purpose) ? data.purpose : '';
  data.image_url = !isEmpty(data.image_url) ? data.image_url : '';
  // data.description = !isEmpty(data.description) ? data.description : '';
  // if (Validator.isEmpty(data.property_name)) {
  //   errors.property_name = 'The property name is required';
  // }
  // if (Validator.isEmpty(data.status)) {
  //   errors.status = 'The property status is required';
  // }
  // if (!Validator.isFloat(data.price)) {
  //   errors.price = 'The property price must be a float';
  // }
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
  // if (Validator.isEmpty(data.purpose)) {
  //   errors.purpose = 'The property purpose is required';
  // }
  if (Validator.isEmpty(data.image_url)) {
    errors.image_url = 'The property image is required';
  }
  // if (Validator.isEmpty(data.description)) {
  //   errors.description = 'The property description is required';
  // }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};


export default {
  checkSignup, checkLogin, checkProperty, checkEmail,
};
