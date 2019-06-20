/* eslint-disable no-useless-escape */
const login = document.querySelector('#login');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const alertError = document.querySelector('#alert-error');
const error = document.querySelector('#error');
const alertSuccess = document.getElementsByClassName('alert-success')[0];
const spinner = document.getElementsByClassName('spinner')[0];

alertError.style.display = 'none';
alertSuccess.style.display = 'none';
spinner.style.display = 'none';

// Credit: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
login.addEventListener('click', (e) => {
  e.preventDefault();
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

  if (password.value === '') {
    password.classList.add('has-error');
    error.innerHTML = 'Password is required';
    alertError.style.display = 'block';
    password.focus();
    return false;
  }
  password.classList.remove('has-error');
  alertError.style.display = 'none';
  this.document.location.href = 'https://emmanuelnwankwo.github.io/PropertyPro-lite/UI/user.html';
  return true;
});
