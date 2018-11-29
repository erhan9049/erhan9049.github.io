var accuracyDisplay = document.getElementById('accuracyDisplay');
var saveButton = document.getElementById('saveButton');
var fillFormButton = document.getElementById('fillFormButton');
var resultLink = document.getElementById('resultLink');
var resultLabel = document.getElementById('resultLabel');
var geolocationReadCounter = document.getElementById('geolocationReadCounter');

var longitudeTextbox = document.getElementById('longitudeTextbox');
var latitudeTextbox = document.getElementById('latitudeTextbox');
var nameTextbox = document.getElementById('nameTextbox');

var latitude;
var longitude;

var userAgent = navigator.userAgent || navigator.vendor || window.opera;

function geo_success(position) {
    geolocationReadCounter.innerHTML += '.';
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    accuracyDisplay.innerHTML = position.coords.accuracy;

    if (Number(position.coords.accuracy) >= 10) {
        console.log('red');
        accuracyDisplay.className = 'redText';
        // fillFormButton.disabled = true;
    } else {
        console.log('green');
        accuracyDisplay.className = 'greenText';
        // fillFormButton.disabled = false;
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
    resultLabel.innerHTML = ' was created for: ' + latitudeTextbox.value + ', ' + longitudeTextbox.value;
    var nameWithoutSpaces = nameTextbox.value.replace(/\s/g, '');
    resultLink.innerHTML = nameWithoutSpaces + '.kolaykonum.com';
    if (/android/i.test(userAgent)) {
        resultLink.setAttribute('href', 'geo:' + latitude + ',' + longitude + '?q=' + latitude + ',' + longitude + '(' + nameWithoutSpaces + ')')
    }
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        resultLink.setAttribute('href', 'https://maps.apple.com/?ll=' + latitude + ',' + longitude + '&q={' + nameWithoutSpaces + '}')
    }
    else {
        resultLink.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude)
    }

}

function fillForm() {
    latitudeTextbox.value = latitude;
    longitudeTextbox.value = longitude;
}