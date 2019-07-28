/* eslint-disable no-unused-vars, no-undef, no-plusplus */
const slideInterval = 3500;
const getFigures = () => document.getElementById('carousel').getElementsByTagName('div');
const hideImage = () => document.getElementById('hide');
const mapLng = localStorage.getItem('mapLng');
const mapLat = localStorage.getItem('mapLat');
const city = localStorage.getItem('city');

const moveForward = () => {
  let pointer = 0;
  const figures = getFigures();
  const hide = hideImage();
  for (let i = 0; i < figures.length; i++) {
    if (figures[i].className === 'visible') {
      figures[i].className = '';
      pointer = i;
    }
  }
  if (++pointer === figures.length) {
    pointer = 0;
    hide.style.display = '';
  }
  figures[pointer].className = 'visible';
  setTimeout(moveForward, slideInterval);
};

const startPlayback = () => {
  setTimeout(moveForward, slideInterval);
};

startPlayback(); 

function initMap() {
  const myLatLng = { lat: mapLat, lng: mapLng };

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng,
  });

  const marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: city,
  });
}
