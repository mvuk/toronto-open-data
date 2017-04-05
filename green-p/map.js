console.log('map.js init');

var map;
var toronto = {lat:43.65,lng:-79.38}

//draw map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: toronto,
    zoom: 12,
    styles: mapStyles

  });

  google.maps.event.trigger(map, 'resize');

    for (var lot in cityLots) {
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
      google.maps.event.addListener( lotCircle, 'click', function() {
         infoWindow.setContent( this.info );
         infoWindow.open( map, this );
         infoWindow.setPosition(this.center);
      });
    }
    console.log('resize the map')
    google.maps.event.trigger(map, 'resize');

}
