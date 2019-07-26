/* eslint-disable no-useless-escape */
const signUp = document.querySelector('#sign-up');
const firstName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm_password');
const userType = document.getElementsByName('user_type');
const alertError = document.querySelector('#alert-error');
const error = document.querySelector('#error');
const success = document.getElementById('success');
const alertSuccess = document.getElementsByClassName('alert-success')[0];
const spinner = document.getElementsByClassName('spinner')[0];

alertError.style.display = 'none';
alertSuccess.style.display = 'none';
spinner.style.display = 'none';
// Credit: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Credit: https://stackoverflow.com/questions/16299036/to-check-if-a-string-is-alphanumeric-in-javascript
const passwordCombination = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
const check = () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < userType.length; i++) {
    if (userType[i].checked) {
      return userType[i].value;
    }
  }
};
const createAccount = (userData) => {
  const url = 'https://propertypro-lit.herokuapp.com/api/v1/auth/signup';
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-type': 'application/json' },
  };
  spinner.style.display = 'block';
  fetch(url, fetchData)
    .then(res => res.json())
    .then((res) => {
      spinner.style.display = 'none';
      if (res.status !== 'success') {
        if (res.status === 400) {
          error.innerHTML = `${JSON.stringify(res.error).split('"')[3]}`;
          alertError.style.display = 'block';
        } else {
          error.innerHTML = res.error;
          alertError.style.display = 'block';
        }
      } else {
        const { data } = res;
        const { token, user } = data;
        success.innerHTML = 'Registration successful...';
        alertSuccess.style.display = 'block';
        localStorage.setItem('token', token);
        localStorage.setItem('authUser', JSON.stringify(user));
        setTimeout(() => {
          if (user.is_admin) {
            localStorage.setItem('isAdmin', user.is_admin);
            window.location.replace('admin.html');
          } else if (user.user_type === 'agent') {
            localStorage.setItem('userType', user.user_type);
            window.location.replace('agent.html');
          } else window.location.replace('user.html');
        }, 3000);
      }
    })
    .catch((err) => {
      error.innerHTML = err.message;
      alertError.style.display = 'block';
    });
};

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

  if (!passwordCombination.test(password.value)) {
    password.classList.add('has-error');
    error.innerHTML = 'Your Password must contain atleast 2 numbers and letter';
    alertError.style.display = 'block';
    password.focus();
    return false;
  }
  password.classList.remove('has-error');

  if (password.value.length < 8) {
    password.classList.add('has-error');
    error.innerHTML = 'Password must be at least 8 characters';
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

  const userData = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: String(email.value).toLowerCase(),
    phone_number: phone.value,
    password: password.value,
    address: address.value,
    user_type: check(),
  };
  createAccount(userData);
});
