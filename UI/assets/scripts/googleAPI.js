/* eslint-disable no-unused-vars, no-undef */
function initMap() {
  const input = document.getElementById('property-city');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    localStorage.setItem('mapLng', place.geometry.location.lng());
    localStorage.setItem('mapLat', place.geometry.location.lat());
  });
}
