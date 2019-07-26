/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
const login = document.querySelector('#login');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const alertError = document.querySelector('#alert-error');
const error = document.querySelector('#error');
const spinner = document.getElementsByClassName('spinner')[0];

alertError.style.display = 'none';
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

  const url = 'https://propertypro-lit.herokuapp.com/api/v1/auth/signin';
  const loginData = {
    email: String(email.value).toLowerCase(),
    password: password.value,
  };
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: { 'Content-type': 'application/json' },
  };
  spinner.style.display = 'block';
  fetch(url, fetchData)
    .then(res => res.json())
    .then((res) => {
      spinner.style.display = 'none';
      if (res.error) {
        if (res.status === 401) {
          error.innerHTML = res.error;
          alertError.style.display = 'block';
        } else if (res.status === 404) {
          error.innerHTML = res.error;
          alertError.style.display = 'block';
        } else {
          error.innerHTML = `${JSON.stringify(res.error).split('"')[3]}`;
          alertError.style.display = 'block';
        }
      } else {
        const { data } = res;
        const { token, id, first_name, last_name, phone_number, address, passport_url, user_type, is_admin } = data;
        localStorage.setItem('token', token);
        const user = { id, email: loginData.email, first_name, last_name, phone_number, address, passport_url, user_type, is_admin };
        localStorage.setItem('authUser', JSON.stringify(user));
        if (is_admin) {
          localStorage.setItem('isAdmin', is_admin);
          window.location.replace('admin.html');
        } else if (user_type === 'agent') {
          localStorage.setItem('userType', user_type);
          window.location.replace('agent.html');
        } else window.location.replace('user.html');
      }
    })
    .catch((err) => {
      error.innerHTML = err.message;
      alertError.style.display = 'block';
    });
});
