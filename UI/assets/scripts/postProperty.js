const propertyName = document.querySelector('#property-name');
const propertyPrice = document.querySelector('#property-price');
const propertyCity = document.querySelector('#property-city');
const propertyImage1 = document.querySelector('#property-image1');
const propertyImage2 = document.querySelector('#property-image2');
const propertyImage3 = document.querySelector('#property-image3');
const propertyAddress = document.querySelector('#property-address');
const propertyDescription = document.querySelector('#property-description');
const propertyState = document.querySelector('#property-state');
const propertyType = document.querySelector('#property-type');
const propertyPurpose = document.querySelector('#property-purpose');
const postPropertyBtn = document.querySelector('#post-property');
const error = document.querySelector('#error');
const alertError = document.querySelector('#alert-error');
const alertSuccess = document.getElementsByClassName('alert-success')[0];
const alertInfo = document.getElementsByClassName('alert-info')[0];
const success = document.getElementById('success');
const info = document.getElementById('info');

const firstName = document.getElementById('first_name');
const profilePic = document.getElementById('profile_photo');

const user = JSON.parse(localStorage.getItem('authUser'));
const token = localStorage.getItem('token');
const mapLng = localStorage.getItem('mapLng');
const mapLat = localStorage.getItem('mapLat');
const passportUrl = user.passport_url || './assets/img/avatar.png';
const propertyUrl = 'https://propertypro-lit.herokuapp.com/api/v1/property';

firstName.innerHTML = user.first_name;
profilePic.setAttribute('src', passportUrl);
alertError.style.display = 'none';
alertSuccess.style.display = 'none';
alertInfo.style.display = 'none';

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
const postProperty = () => {
  const propertyData = {
    property_name: propertyName.value,
    price: propertyPrice.value,
    city: propertyCity.value,
    state: propertyState.value,
    address: propertyAddress.value,
    description: propertyDescription.value,
    type: propertyType.value,
    purpose: propertyPurpose.value,
    image_url: propertyImage1.value,
    image_url_2: propertyImage2.value,
    image_url_3: propertyImage3.value,
    map_lng: mapLng,
    map_lat: mapLat,
  };
  const postOptions = {
    method: 'POST',
    body: JSON.stringify(propertyData),
    headers: {
      'Content-type': 'application/json',
      authorization: token,
    },
  };
  toggleInfo('Processing...', false);
  fetch(propertyUrl, postOptions)
    .then(res => res.json())
    .then((res) => {
      toggleInfo();
      if (res.status === 201) {
        showAlert('Property successful created');
        setTimeout(() => {
          localStorage.removeItem('mapLng');
          localStorage.removeItem('mapLat');
          window.location = 'agent.html';
        }, 1000);
      } else showAlert('Unable to create a property, try again', false);
    })
    .catch((err) => {
      console.log(err);
      toggleInfo();
      if (err) showAlert('Unable to create a property, try again', false);
    });
};

postPropertyBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (propertyName.value === '') {
    propertyName.classList.add('has-error');
    error.innerHTML = 'Property Title is required';
    alertError.style.display = 'block';
    propertyName.focus();
    return false;
  }
  propertyName.classList.remove('has-error');
  if (propertyPrice.value === '') {
    propertyPrice.classList.add('has-error');
    error.innerHTML = 'Price cannot be empty';
    alertError.style.display = 'block';
    propertyPrice.focus();
    return false;
  }
  propertyPrice.classList.remove('has-error');
  if (propertyState.value === '') {
    propertyState.classList.add('has-error');
    error.innerHTML = 'State is required';
    alertError.style.display = 'block';
    propertyState.focus();
    return false;
  }
  propertyState.classList.remove('has-error');
  if (propertyCity.value === '') {
    propertyCity.classList.add('has-error');
    error.innerHTML = 'City is required';
    alertError.style.display = 'block';
    propertyCity.focus();
    return false;
  }
  propertyCity.classList.remove('has-error');
  if (propertyImage1.value === '') {
    propertyImage1.classList.add('has-error');
    error.innerHTML = 'Select Featured Image';
    alertError.style.display = 'block';
    propertyImage1.focus();
    return false;
  }
  propertyImage1.classList.remove('has-error');
  if (propertyAddress.value === '') {
    propertyAddress.classList.add('has-error');
    error.innerHTML = 'Property Address is required';
    alertError.style.display = 'block';
    propertyAddress.focus();
    return false;
  }
  propertyAddress.classList.remove('has-error');
  if (propertyDescription.value === '') {
    propertyDescription.classList.add('has-error');
    error.innerHTML = 'Property Description is required';
    alertError.style.display = 'block';
    propertyDescription.focus();
    return false;
  }
  propertyDescription.classList.remove('has-error');
  alertError.style.display = 'none';
  postProperty();
});
