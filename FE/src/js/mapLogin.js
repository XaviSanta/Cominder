var mapLogin = new mapboxgl.Map({
  container: 'mapLogin',
  style: 'mapbox://styles/xavisanta/ck7i792ip5snm1jsh5q9mtf37', // replace this with your style URL
  center: [2.191607919009357, 41.40499328136784],
  zoom: 13.7
});

mapLogin.on('style.load', () => {
  mapLogin.addSource('point-login-source', {
    'type': 'geojson',
    'data': geojson
  });
  mapLogin.addLayer({
    'id': 'point-login',
    'type': 'symbol',
    'source': 'point-login-source',
    'layout': {
      'icon-image': 'restaurant-15',
      'icon-size': 1,
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'text-field': ['get', 'title'],
      'text-variable-anchor': ['top'],
      'text-radial-offset': 1.1,
      'text-justify': 'auto',
      'text-allow-overlap': true,
    },
    paint: {
      "text-color": "#000"
    }
  });
});

mapLogin.on('click', function(e) {
  const lng = e.lngLat.lng;
  const lat = e.lngLat.lat;
  coordinatesMyRestaurant = [lng, lat];
  if (mapLogin.getLayer('point')){
    mapLogin.removeLayer('point');
  }
  if (mapLogin.getSource('point')){
    mapLogin.removeSource('point');
  }
  mapLogin.addSource('point', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [{
        // feature for Mapbox DC
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [
            lng,
            lat
          ]
        },
        'properties': {
          'title': 'MyRestaurant',
          'icon': 'restaurant'
        }
      }, ]
    }
  });
  mapLogin.addLayer({
    'id': 'point',
    'type': 'symbol',
    'source': 'point',
    'layout': {
      // get the icon name from the source's "icon" property
      // concatenate the name to get an icon from the style's sprite sheet
      'icon-image': ['concat', ['get', 'icon'], '-15'],
      // get the title name from the source's "title" property
      'text-field': ['get', 'title'],
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.6],
      'text-anchor': 'top'
    }
  });
  $('#btnSubmitRegisterRest').prop("disabled", false);
});

var search = new MapboxGeocoder(
  {
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: {
      color: 'orange'
    },
  });
mapLogin.addControl(search, 'top-left');