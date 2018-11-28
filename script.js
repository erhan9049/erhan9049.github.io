var coordinatesDisplay = document.getElementById('coordinatesDisplay');
var accuracyDisplay = document.getElementById('accuracyDisplay');
var timestampDisplay = document.getElementById('timestampDisplay');

if ("geolocation" in navigator) {
    coordinatesDisplay.innerHTML = 'geolocation is available';
} else {
    coordinatesDisplay.innerHTML = 'geolocation unavailable';
}

function geo_success(position) {
    coordinatesDisplay.innerHTML = position.coords.latitude + ', ' + position.coords.longitude;
    accuracyDisplay.innerHTML = position.coords.accuracy;
    timestampDisplay.innerHTML = position.timestamp;

    if (position.coords.accuracy >= 10) {
        console.log('red');
    } else {
        console.log('green');
    }
}

function geo_error() {
    alert("Sorry, no position available.");
}

var geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);