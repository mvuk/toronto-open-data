// Empty locations object
var cityLots = {};

// GET THE JSON FILE
$.getJSON('green-p-data.json', function(data) {
    console.log('after getJSON')
    //data is the JSON string, one less because of 0th location
    for (var i = 0; i <= data.carparks.length-1;i++) {
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
    }

});

console.log('cityLots');

var map;
var toronto = {lat:43.65,lng:-79.38}

//draw map
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: toronto,
    zoom: 12,
    styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]

  });
  console.log('before for loop')
  for (var lot in cityLots) {
    console.log('just inside for loop')
    var lotContent = '<h4>' + cityLots[lot].address + '</h4> <p>Capacity: ' + cityLots[lot].capacity + '</p><p>Rate: ' + cityLots[lot].rateText + '</p>'

    var infoWindow = new google.maps.InfoWindow({
      content: lotContent
    });

    var lotCircle = new google.maps.Circle({
      strokeColor: '#FFFFFF',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: cityLots[lot].colour,
      fillOpacity: 0.85,
      map: map,
      info: lotContent,
      center: {lat:cityLots[lot].lat,lng:cityLots[lot].lng},
      radius: (Math.sqrt(cityLots[lot].capacity) +20)* 5,
    });
    console.log('before listener');
    google.maps.event.addListener( lotCircle, 'click', function() {
       infoWindow.setContent( this.info );
       infoWindow.open( map, this );
       infoWindow.setPosition(this.center);
    });
    console.log('after listener')
  }

}
