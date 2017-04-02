// Empty locations object
var cityLots = {};

console.log('map.js init')

// GET THE JSON FILE
$.getJSON('green-p-data.json', function(data) {
    console.log('after getJSON')
    //data is the JSON string, one less because of 0th location
    for (var i = 0; i <= data.carparks.length-1;i++) {
        console.log('data-carparks-length for loop')
        // turn that into one object
        var carparksLat = parseFloat(data.carparks[i].lat);
        var carparksLng = parseFloat(data.carparks[i].lng);
        var carparksRate = parseFloat(data.carparks[i].rate_half_hour);
        var carparksRateText = data.carparks[i].rate;
        var carparksCapacity = parseFloat(data.carparks[i].capacity);
        var carparksAddress = data.carparks[i].address;
        var parkingLot = {lat:carparksLat,lng:carparksLng,rate:carparksRate,capacity:carparksCapacity};

        // create color values for various rates
        var rateColour = {};
        if (carparksRate == false) {
          rateColour = '#00FF00';
        } else if (carparksRate <= 0.50 ) {
          rateColour = '#66ff00';
        } else if (carparksRate <= 1.00 ) {
          rateColour = '#ccff00';
        } else if (carparksRate <= 1.50 ) {
          rateColour = '#FFCC00';
        } else if (carparksRate <= 2.00 ) {
          rateColour = '#FF9900';
        } else if (carparksRate <= 3.50 ) {
          rateColour = '#FF3300';
        } else {
          rateColour = '#00FF00';
        };

        //add the object into the cityLots object
        cityLots[i] = {
          lat:carparksLat,
          lng:carparksLng,
          rate:carparksRate,
          colour:rateColour,
          rateText:carparksRateText,
          capacity:carparksCapacity,
          address:carparksAddress
        };
        console.log('cityLots appended')
    }

});
