const signUp = document.querySelector('#sign-up');
const firstName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
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
    error.innerHTML = 'The First name is required';
    alertError.style.display = 'block';
    firstName.focus();
    return false;
  }
  firstName.classList.remove('has-error');

  if (lastName.value === '') {
    lastName.classList.add('has-error');
    error.innerHTML = 'The Last name is required';
    alertError.style.display = 'block';
    lastName.focus();
    return false;
  }
  lastName.classList.remove('has-error');

  if (email.value === '') {
    email.classList.add('has-error');
    error.innerHTML = 'The Email is required';
    alertError.style.display = 'block';
    email.focus();
    return false;
  }
  email.classList.remove('has-error');
  if (!validEmail.test(String(email.value).toLowerCase())) {
    email.classList.add('has-error');
    error.innerHTML = 'The email must be valid';
    alertError.style.display = 'block';
    email.focus();
    return false;
  }
  email.classList.remove('has-error');

  if (phone.value === '') {
    phone.classList.add('has-error');
    error.innerHTML = 'The phone number is required';
    alertError.style.display = 'block';
    phone.focus();
    return false;
  }
  phone.classList.remove('has-error');
  if (phone.value.length < 11) {
    phone.classList.add('has-error');
    error.innerHTML = 'The phone number must be valid';
    alertError.style.display = 'block';
    phone.focus();
    return false;
  }
  phone.classList.remove('has-error');

  if (password.value === '') {
    password.classList.add('has-error');
    error.innerHTML = 'The password is required';
    alertError.style.display = 'block';
    password.focus();
    return false;
  }
  password.classList.remove('has-error');

  if (password.value.length < 6) {
    password.classList.add('has-error');
    error.innerHTML = 'The password must be at least 6 characters long';
    alertError.style.display = 'block';
    password.focus();
    return false;
  }
  password.classList.remove('has-error');
  if (password.value !== confirmPassword.value) {
    password.classList.add('has-error');
    error.innerHTML = 'The password must match';
    alertError.style.display = 'block';
    password.focus();
    return false;
  }
  password.classList.remove('has-error');
  alertError.style.display = 'none';
  spinner.style.display = 'block';

});
