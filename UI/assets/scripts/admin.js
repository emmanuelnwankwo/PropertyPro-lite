/* eslint-disable no-plusplus */
const alertError = document.getElementById('alert-error');
const error = document.getElementById('error');
const success = document.getElementById('success');
const info = document.getElementById('info');
const alertSuccess = document.getElementsByClassName('alert-success')[0];
const alertInfo = document.getElementsByClassName('alert-info')[0];
const searchButton = document.getElementById('search-type-btn');

const firstName = document.getElementById('first_name');
const profilePic = document.getElementById('profile_photo');
const table = document.getElementById('user_table');
let users;

const user = JSON.parse(localStorage.getItem('authUser'));
const token = localStorage.getItem('token');
const passportUrl = user.passport_url || './assets/img/avatar.png';
const userUrl = 'https://propertypro-lit.herokuapp.com/api/v1/admin';
let deleteUserUrl;

alertError.style.display = 'none';
alertSuccess.style.display = 'none';
alertInfo.style.display = 'none';

const searchUser = () => {
  let td; 
  let txtValue;
  const filter = searchButton.value.toUpperCase();
  const usertable = document.getElementById('users');
  const tr = usertable.getElementsByTagName('tr');
  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
};
searchButton.addEventListener('keyup', searchUser);
const showAlert = (message, succeeded = true) => {
  if (succeeded) {
    success.innerHTML = message;
    alertSuccess.style.display = 'block';
    setTimeout(() => {
      alertSuccess.style.display = 'none';
    }, 5000);
  } else {
    error.innerHTML = message;
    alertError.style.display = 'block';
    setTimeout(() => {
      alertError.style.display = 'none';
    }, 5000);
  }
};
const toggleInfo = (msg = null, hide = true) => {
  if (hide) {
    alertInfo.style.display = 'none';
  } else {
    info.innerHTML = msg;
    alertInfo.style.display = 'block';
  }
};

const getOptions = {
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/json',
    authorization: token,
  }),
};
firstName.innerHTML = user.first_name;
profilePic.setAttribute('src', passportUrl);
fetch(userUrl, getOptions)
  .then(res => res.json())
  .then((res) => {
    if (res.status === 'success') {
      const { data } = res;
      data.forEach((userDetails) => {
        users = `
                      <tr>
                        <td>${userDetails.first_name} ${userDetails.last_name}</td>
                        <td>${userDetails.email}</td>
                        <td>${userDetails.user_type}</td>
                        <td class="text-center pr-0 pl-0">
                            <button onclick="deleteProperty(${userDetails.id})" style="border: none;" class="btn btn-primary"><a>
                                <i class="icon-trash"></i></a></button>
                        </td>
                    </tr>
        `;
        table.insertAdjacentHTML('afterbegin', users);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

const deleteProperty = (userId) => {
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (confirmed) {
    deleteUserUrl = `https://propertypro-lit.herokuapp.com/api/v1/admin/${userId}`;
    const deleteOptions = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token,
      }),
    };
    toggleInfo('Processing...', false);
    fetch(deleteUserUrl, deleteOptions)
      .then(res => res.json())
      .then((res) => {
        toggleInfo();
        if (res.status === 'success') {
          showAlert('User deleted successfully');
          window.location.reload();
        } else if (res.status === 404) {
          showAlert(res.error, false);
        } else showAlert('Unable to delete the user, try again', false);
      })
      .catch((err) => {
        console.log(err);
        toggleInfo();
        if (err) showAlert('Unable to delete the user, try again', false);
      });
  }
};
