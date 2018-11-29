var accuracyDisplay = document.getElementById('accuracyDisplay');
var saveButton = document.getElementById('saveButton');
var fillFormButton = document.getElementById('fillFormButton');
var resultLink = document.getElementById('resultLink');
var resultLabel = document.getElementById('resultLabel');
var geolocationReadCounter = document.getElementById('geolocationReadCounter');

var longitudeTextbox = document.getElementById('longitudeTextbox');
var latitudeTextbox = document.getElementById('latitudeTextbox');
var nameTextbox = document.getElementById('nameTextbox');

var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/android/i.test(userAgent)) {
    testLink.setAttribute('href', 'geo:38.332412,27.120925?q=38.332412,27.120925(Yo+Yo)');
}
else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    testLink.setAttribute('href', 'https://maps.apple.com/?ll=38.332412,27.120925&q={Yo+Yo}');
}
else {
    testLink.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=38.332412,27.120925');
}

function geo_success(position) {
    accuracyDisplay.innerHTML = position.coords.accuracy;
    geolocationReadCounter.innerHTML += '.';

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
    resultLabel.innerHTML = nameTextbox.value + '.kolaykonum.com was created for: ' + latitudeTextbox.value + ', ' + longitudeTextbox.value;
    resultLink.innerHTML = nameTextbox.value + 'kolaykonum.com';
    if (/android/i.test(userAgent)) {
        resultLink.setAttribute('href', 'geo:38.332412,27.120925?q=38.332412,27.120925(Yo+Yo)')
    }
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        resultLink.setAttribute('href', 'https://maps.apple.com/?ll=38.332412,27.120925&q={Yo+Yo}')
    }
    else {
        resultLink.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=38.332412,27.120925')
    }
    
}

function fillForm() {
    latitudeTextbox.value = latitudeDisplay.innerHTML;
    longitudeTextbox.value = longitudeDisplay.innerHTML;
}