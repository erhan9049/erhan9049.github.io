var coordinatesDisplay = document.getElementById('coordinatesDisplay');
var accuracyDisplay = document.getElementById('accuracyDisplay');
var timestampDisplay = document.getElementById('timestampDisplay');
var saveButton = document.getElementById('saveButton');

var longitudeTextbox = document.getElementById('longitudeTextbox');
var latitudeTextbox = document.getElementById('latitudeTextbox');
var nameTextbox = document.getElementById('nameTextbox');

if ("geolocation" in navigator) {
    coordinatesDisplay.innerHTML = 'geolocation is available';
} else {
    coordinatesDisplay.innerHTML = 'geolocation unavailable';
}

function geo_success(position) {
    coordinatesDisplay.innerHTML = position.coords.latitude + ', ' + position.coords.longitude;
    accuracyDisplay.innerHTML = position.coords.accuracy;
    timestampDisplay.innerHTML = position.timestamp;

    if (Number(position.coords.accuracy) >= 10) {
        console.log('red');
        accuracyDisplay.className = 'redText';
        fillFormButton.disabled = true;
    } else {
        console.log('green');
        accuracyDisplay.className = 'greenText';
        fillFormButton.disabled = false;
    }
}

function geo_error() {
    alert("Sorry, no position available.");
}

var geo_options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
};

var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

function saveButtonClicked() {
    alert(nameTextbox.value + '.kolaykonum.com was created for: ' + position.coords.latitude + ', ' + position.coords.longitude);
}

function fillForm() {
    longitudeTextbox.value = position.coords.longitude;
    latitudeTextbox.value = position.coords.latitude;
}