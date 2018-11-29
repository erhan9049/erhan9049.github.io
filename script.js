var latitudeDisplay = document.getElementById('latitudeDisplay');
var longitudeDisplay = document.getElementById('longitudeDisplay');
var accuracyDisplay = document.getElementById('accuracyDisplay');
var timestampDisplay = document.getElementById('timestampDisplay');
var saveButton = document.getElementById('saveButton');

var longitudeTextbox = document.getElementById('longitudeTextbox');
var latitudeTextbox = document.getElementById('latitudeTextbox');
var nameTextbox = document.getElementById('nameTextbox');

// Android href = "geo:38.332412,27.120925?q=38.332412,27.120925(Yo+Yo)"
// iOS href = "https://maps.apple.com/?ll=38.332412,27.120925&q={Yo+Yo}"
// Others href = "https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393"

var testLink = document.getElementById('testLink');
var osLabel = document.getElementById('osLabel');
var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/android/i.test(userAgent)) {
    testLink.setAttribute('href', 'geo:38.332412,27.120925?q=38.332412,27.120925(Yo+Yo)');
    osLabel.innerHTML = 'Android device';
}
else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    testLink.setAttribute('href', 'https://maps.apple.com/?ll=38.332412,27.120925&q={Yo+Yo}');
    osLabel.innerHTML = 'iOS device';
}
else {
    testLink.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=38.332412,27.120925');
    osLabel.innerHTML = 'Other device';
}

function geo_success(position) {
    latitudeDisplay.innerHTML = position.coords.latitude;
    longitudeDisplay.innerHTML = position.coords.longitude;
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
    console.log(nameTextbox.value + '.kolaykonum.com was created for: ' + latitudeTextbox.value + ', ' + longitudeTextbox.value);
}

function fillForm() {
    latitudeTextbox.value = latitudeDisplay.innerHTML;
    longitudeTextbox.value = longitudeDisplay.innerHTML;
}