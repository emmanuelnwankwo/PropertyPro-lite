/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
const searchButton = document.querySelector('#search-type-btn');

const searchProperty = () => {
  const type = document.getElementById('search-bedroom');
  const filter = type.value.toUpperCase();
  const row = document.getElementById('search').getElementsByTagName('a');
  for (let i = 0; i < row.length; i++) {
    row[i].style.display = 'none';

    const div = row[i].getElementsByTagName('div');
    for (let j = 0; j < div.length; j++) {
      const text = row[i].getElementsByTagName('h4')[j];
      if (text) {
        if (text.innerHTML.toUpperCase().indexOf(filter) > -1) {
          row[i].style.display = '';
          break;
        }
      }
    }
  }
};
searchButton.addEventListener('click', searchProperty);

const firstName = document.getElementById('first_name');
const profilePic = document.getElementById('profile_photo');
const table = document.getElementById('property_table');
let properties;

const user = JSON.parse(localStorage.getItem('authUser'));
const token = localStorage.getItem('token');
const passportUrl = user.passport_url || './assets/img/avatar.png';
const propertyUrl = 'https://propertypro-lit.herokuapp.com/api/v1/property';
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
      if (data.length) {
        data.forEach((property) => {
          const date = new Date(property.created_on);
          properties = `
          <a href="./property.html" onclick="property(${property.id}, ${property.map_lat}, ${property.map_lng}, '${property.city}')">
          <div class="property-col">
            <div class="property-container">
            <div class="property-image">
            <img src="./assets/img/property.jpg"
              alt="Property Image">
                <div class="property-price">
              <h4>${property.type}</h4>
              <span>₦${property.price}
              </span>
          </div>
          <div class="property-status">
              <span>${property.status}</span>
          </div>
      </div>
      <div class="property-features">
          <span><i class="location"></i>${property.city}, ${property.state}</span>
      </div>
      <div class="property-content">
          <h3>${property.property_name}<small>${date.toLocaleString('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
})}</small>
          </h3>
      </div>
  </div>
</div>
</a>
      `;
          table.insertAdjacentHTML('afterbegin', properties);
        });
      } else {
        table.insertAdjacentHTML('afterbegin', '<br /><p class="text-primary-color text-center">Properties not found</p>');
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
const property = (propertyId, mapLat, mapLng, city) => {
  localStorage.setItem('mapLng', mapLng);
  localStorage.setItem('mapLat', mapLat);
  localStorage.setItem('city', city);
  localStorage.setItem('propertyId', propertyId);
  window.location.replace('property.html');
};
