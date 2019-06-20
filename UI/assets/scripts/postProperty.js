const propertyName = document.querySelector('#property-name');
const propertyOwner = document.querySelector('#property-owner');
const propertyPrice = document.querySelector('#property-price');
const propertyOwnerPhone = document.querySelector('#property-owner-phone');
const propertyCity = document.querySelector('#property-city');
const propertyImage1 = document.querySelector('#property-image1');
const propertyAddress = document.querySelector('#property-address');
const propertyDescription = document.querySelector('#property-description');
const postProperty = document.querySelector('#post-property');
const error = document.querySelector('#error');
const alertError = document.querySelector('#alert-error');
const alertSuccess = document.getElementsByClassName('alert-success')[0];

alertError.style.display = 'none';
alertSuccess.style.display = 'none';
postProperty.addEventListener('click', (e) => {
  e.preventDefault();
  if (propertyName.value === '') {
    propertyName.classList.add('has-error');
    error.innerHTML = 'Property Name is required';
    alertError.style.display = 'block';
    propertyName.focus();
    return false;
  }
  propertyName.classList.remove('has-error');
  if (propertyOwner.value === '') {
    propertyOwner.classList.add('has-error');
    error.innerHTML = 'Property Owner is empty';
    alertError.style.display = 'block';
    propertyOwner.focus();
    return false;
  }
  propertyOwner.classList.remove('has-error');
  if (propertyPrice.value === '') {
    propertyPrice.classList.add('has-error');
    error.innerHTML = 'Price cannot be empty';
    alertError.style.display = 'block';
    propertyPrice.focus();
    return false;
  }
  propertyPrice.classList.remove('has-error');
  if (propertyOwnerPhone.value === '') {
    propertyOwnerPhone.classList.add('has-error');
    error.innerHTML = 'Phone number is required';
    alertError.style.display = 'block';
    propertyOwnerPhone.focus();
    return false;
  }
  propertyOwnerPhone.classList.remove('has-error');
  if (propertyOwnerPhone.value < 11) {
    propertyOwnerPhone.classList.add('has-error');
    error.innerHTML = 'Enter valid number';
    alertError.style.display = 'block';
    propertyOwnerPhone.focus();
    return false;
  }
  propertyOwnerPhone.classList.remove('has-error');
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
  return true;
});
