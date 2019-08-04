/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */

// const toggle = document.querySelectorAll('.myonoffswitch');

// const show = () => {
//   if (toggle.checked === true) {
//     console.log('Toggle Checked');
//     // console.log(url);
//   }
//   if (toggle.checked === false) {
//     // Console.log('Toggle Unchecked');
//   }
// };
// toggle.addEventListener('change', show);
const alertError = document.getElementById('alert-error');
const error = document.getElementById('error');
const success = document.getElementById('success');
const info = document.getElementById('info');
const alertSuccess = document.getElementsByClassName('alert-success')[0];
const alertInfo = document.getElementsByClassName('alert-info')[0];
const searchButton = document.getElementById('search-type-btn');

const firstName = document.getElementById('first_name');
const profilePic = document.getElementById('profile_photo');
const table = document.getElementById('property_table');
let properties;

const user = JSON.parse(localStorage.getItem('authUser'));
const token = localStorage.getItem('token');
const passportUrl = user.passport_url || './assets/img/avatar.png';
const propertyUrl = 'https://propertypro-lit.herokuapp.com/api/v1/agent';
let deletePropertyUrl;

alertError.style.display = 'none';
alertSuccess.style.display = 'none';
alertInfo.style.display = 'none';

const searchUser = () => {
  let td;
  let txtValue;
  const filter = searchButton.value.toUpperCase();
  const usertable = document.getElementById('properties');
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
fetch(propertyUrl, getOptions)
  .then(res => res.json())
  .then((res) => {
    if (res.status === 200) {
      const { data } = res;
      data.forEach((property, index) => {
        properties = `
                      <tr>
                        <td>${property.property_name}</td>
                        <td>${property.type}</td>
                        <td>${property.status}</td>
                        <td class="text-center pr-0 pl-0">
                            <div class="onoffswitch">
                                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox"
                                    id="myonoffswitch${index}" onload="checkSoldBtnStatus()" onchange="changePropertyStatus(${property.id}, myonoffswitch${index})" ${(property.status === 'sold') ? 'checked' : ''}>
                                <label class="onoffswitch-label" for="myonoffswitch${index}">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                            <button class="btn btn-primary" onclick="editProperty(${property.id})" style="border: none;"><a>
                                <i class="icon-edit"></i></a></button>
                            <button onclick="deleteProperty(${property.id})" style="border: none;" class="btn btn-primary"><a>
                                <i class="icon-trash"></i></a></button>
                        </td>
                    </tr>
        `;
        table.insertAdjacentHTML('afterbegin', properties);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

const changePropertyStatus = (propertyId, id) => {
  const soldPropertyUrl = `https://propertypro-lit.herokuapp.com/api/v1/property/${propertyId}/sold`;
  if (id.checked === true) {
    const patchOptions = {
      method: 'PATCH',
      body: JSON.stringify({ status: 'sold' }),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token,
      }),
    };
    toggleInfo('Processing...', false);
    fetch(soldPropertyUrl, patchOptions)
      .then(res => res.json())
      .then((res) => {
        toggleInfo();
        if (res.status === 200) {
          showAlert('Property is now marked Sold');
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        toggleInfo();
        if (err) showAlert('Unable to update the property, try again', false);
      });
  }
  if (id.checked === false) {
    const patchOptions = {
      method: 'PATCH',
      body: JSON.stringify({ status: 'available' }),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token,
      }),
    };
    toggleInfo('Processing...', false);
    fetch(soldPropertyUrl, patchOptions)
      .then(res => res.json())
      .then((res) => {
        toggleInfo();
        if (res.status === 200) {
          showAlert('Property is now marked Available');
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        toggleInfo();
        if (err) showAlert('Unable to update the property, try again', false);
      });
  }
};

const checkSoldBtnStatus = () => {
  console.log('working');
};
const deleteProperty = (propertyId) => {
  const confirmed = confirm('Are you sure you want to delete this property?');
  if (confirmed) {
    deletePropertyUrl = `https://propertypro-lit.herokuapp.com/api/v1/property/${propertyId}`;
    const deleteOptions = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: token,
      }),
    };
    toggleInfo('Processing...', false);
    fetch(deletePropertyUrl, deleteOptions)
      .then(res => res.json())
      .then((res) => {
        toggleInfo();
        if (res.status === 200) {
          showAlert('Property deleted successfully');
          window.location.reload();
        } else if (res.status === 404) {
          showAlert(res.error, false);
        } else showAlert('Unable to delete the property, try again', false);
      })
      .catch((err) => {
        console.log(err);
        toggleInfo();
        if (err) showAlert('Unable to delete the property, try again', false);
      });
  }
};

const editProperty = (propertyId) => {
  if (propertyId) {
    localStorage.setItem('propertyId', propertyId);
    window.location.replace('update.html');
  }
};
