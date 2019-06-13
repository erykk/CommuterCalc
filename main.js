let map = null;
let directionsService = null;
let directionsDisplay = null;
let distanceMatrix = null;

//global vars
let distanceToTravel;
let timeToTravel;

function initMap () {
    //Dublin LatLong
    let dublin = new google.maps.LatLng(53.36,7.52);
    //Map Opts
    let options = {
        zoom: 6,
        center : dublin
    }

    map = new google.maps.Map(document.getElementById('map'),options);  
}


document.querySelector("#calcRoute").addEventListener('click', setAtoB);

document.querySelector('#calcBtn').addEventListener('click', getTrip);


function setAtoB () {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    distanceMatrix = new google.maps.DistanceMatrixService();
    directionsDisplay.setMap(map);

    let pointA = validateInput(document.querySelector('#pointA').value);
    let pointB = validateInput(document.querySelector('#pointB').value);
    
    let dirRequest = {
        origin: pointA, 
        destination: pointB,
        travelMode: 'DRIVING'
    }

    let distRequest = {
        origins: [pointA], 
        destinations: [pointB],
        travelMode: 'DRIVING'
    }

    distanceMatrix.getDistanceMatrix(distRequest, function(response) {
        distanceToTravel = response.rows[0].elements[0].distance.value;
        timeToTravel = response.rows[0].elements[0].duration.value;
    });

    directionsService.route(dirRequest, function(response){
        directionsDisplay.setDirections(response);
    } );
}

function getSchdule() {
    let radio = document.querySelector('input[name="freqTog"]:checked');

    if (radio.value == 'once') {
        return 1;
        
    } else {
        let tPW = document.querySelector('#timesPerWeek').value;
        let tPY = document.querySelector('#timesPerYear').value;

        return tPW * tPY;
    }
}

function getTrip () {
    let daysTravelling = getSchdule();
    let costOfFuel = document.querySelector('#costOfFuel').value;
    console.log('Days: ' + daysTravelling + " Fuel: " + costOfFuel + " Distance: " + distanceToTravel);
}

function validateInput (string) {
    if (string.length == 0) {
        showMessage("Please fill out the form","danger");
    }

    return string;
}

function showMessage (message, type) {
    const div = document.createElement("div");

    div.innerHTML = message;
    div.classList = `alert alert-${type} popUpWarning`;
    
    const parent = document.querySelector('.page');
    const firstChild = document.querySelector('#AtoB');

    parent.insertBefore(div,firstChild);

    setTimeout(() => document.querySelector(".alert").remove(), 2000);
}
