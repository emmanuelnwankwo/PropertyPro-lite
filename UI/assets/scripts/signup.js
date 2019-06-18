const signUp = document.querySelector('#sign-up');
const firstName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm_password');
const alertError = document.querySelector('#alert-error');
const error = document.querySelector('#error');
const alertSuccess = document.getElementsByClassName('alert-success')[0];
const spinner = document.getElementsByClassName('spinner')[0];

alertError.style.display = 'none';
alertSuccess.style.display = 'none';
spinner.style.display = 'none';
// Credit: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
signUp.addEventListener('click', (e) => {
  e.preventDefault();

  if (firstName.value === '') {
    firstName.classList.add('has-error');
    error.innerHTML = 'First name is required';
    alertError.style.display = 'block';
    firstName.focus();
    return false;
  }
  firstName.classList.remove('has-error');

  if (lastName.value === '') {
    lastName.classList.add('has-error');
    error.innerHTML = 'Last name is required';
    alertError.style.display = 'block';
    lastName.focus();
    return false;
  }
  lastName.classList.remove('has-error');

  if (email.value === '') {
    email.classList.add('has-error');
    error.innerHTML = 'Email is required';
    alertError.style.display = 'block';
    email.focus();
    return false;
  }
  email.classList.remove('has-error');
  if (!validEmail.test(String(email.value).toLowerCase())) {
    email.classList.add('has-error');
    error.innerHTML = 'Email must be valid';
    alertError.style.display = 'block';
    email.focus();
    return false;
  }
  email.classList.remove('has-error');

  if (phone.value === '') {
    phone.classList.add('has-error');
    error.innerHTML = 'Phone number is required';
    alertError.style.display = 'block';
    phone.focus();
    return false;
  }
  phone.classList.remove('has-error');
  if (phone.value.length < 11) {
    phone.classList.add('has-error');
    error.innerHTML = 'Phone number must be valid';
    alertError.style.display = 'block';
    phone.focus();
    return false;
  }
  phone.classList.remove('has-error');

  if (address.value === '') {
    address.classList.add('has-error');
    error.innerHTML = 'Address is required';
    alertError.style.display = 'block';
    address.focus();
    return false;
  }
  address.classList.remove('has-error');

  if (password.value === '') {
    password.classList.add('has-error');
    error.innerHTML = 'Password is required';
    alertError.style.display = 'block';
    password.focus();
    return false;
  }
  password.classList.remove('has-error');

  if (password.value.length < 6) {
    password.classList.add('has-error');
    error.innerHTML = 'Password must be at least 6 characters long';
    alertError.style.display = 'block';
    password.focus();
    return false;
  }
  password.classList.remove('has-error');
  if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add('has-error');
    error.innerHTML = 'Password does not match';
    alertError.style.display = 'block';
    confirmPassword.focus();
    return false;
  }
  confirmPassword.classList.remove('has-error');
  alertError.style.display = 'none';
  spinner.style.display = 'block';

});
