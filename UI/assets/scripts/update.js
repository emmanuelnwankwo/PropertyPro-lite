const updatePropertyBtn = document.querySelector('#update-property');
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
const error = document.querySelector('#error');
const alertError = document.querySelector('#alert-error');
const alertSuccess = document.getElementsByClassName('alert-success')[0];
const alertInfo = document.getElementsByClassName('alert-info')[0];
const success = document.getElementById('success');
const info = document.getElementById('info');

alertError.style.display = 'none';
alertSuccess.style.display = 'none';
alertInfo.style.display = 'none';
const firstName = document.getElementById('first_name');
const profilePic = document.getElementById('profile_photo');

const user = JSON.parse(localStorage.getItem('authUser'));
const token = localStorage.getItem('token');
const propertyId = localStorage.getItem('propertyId');
const passportUrl = user.passport_url || './assets/img/avatar.png';
const propertyUrl = `https://propertypro-lit.herokuapp.com/api/v1/property/${propertyId}`;
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
    const { data } = res;
    propertyName.value = data.property_name;
    propertyPrice.value = data.price;
    propertyCity.value = data.city;
    propertyState.value = data.state;
    propertyAddress.value = data.address;
    propertyDescription.value = data.description;
    propertyType.value = data.type;
    propertyPurpose.value = data.purpose;
  })
  .catch((err) => {
    console.log(err);
  });

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
const updateProperty = () => {
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
  };
  const updateOptions = {
    method: 'PATCH',
    body: JSON.stringify(propertyData),
    headers: {
      'Content-type': 'application/json',
      authorization: token,
    },
  };
  toggleInfo('Processing...', false);
  fetch(propertyUrl, updateOptions)
    .then(res => res.json())
    .then((res) => {
      toggleInfo();
      if (res.status === 200) {
        showAlert('Property successful updated');
        setTimeout(() => {
          window.location.replace('agent.html');
        }, 3000);
      } else showAlert('Unable to update property, try again', false);
    })
    .catch((err) => {
      console.log(err);
      toggleInfo();
      if (err) showAlert('Unable to update property, try again', false);
    });
};
updatePropertyBtn.addEventListener('click', (e) => {
  e.preventDefault();
  updateProperty();
});
