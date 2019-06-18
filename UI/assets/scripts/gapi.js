function initMap() {
    const input = document.getElementById('property-city');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        console.log(place.geometry.location.lng());
        console.log(place.geometry.location.lat());

    });
}