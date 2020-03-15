// Create MAP
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/xavisanta/ck7i792ip5snm1jsh5q9mtf37', // replace this with your style URL
  center: [2.191607919009357, 41.40499328136784],
  zoom: 13.7
});

map.on('load', function(e) {
  numFeatures = geojson.features.length;
});

function loadMyLayers() {
  map.addSource('restaurants-source', {
    'type': 'geojson',
    'data': geojson
  });
  map.addLayer({
    'id': 'restaurants-layer',
    'type': 'symbol',
    'source': 'restaurants-source',
    'layout': {
      'icon-image': 'pin',
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
      "text-color": textColor
    }
  });
}
map.on('click', function(e) {
  const lng = e.lngLat.lng;
  const lat = e.lngLat.lat;
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['restaurants-layer']
  });

  if (!features.length) {
    popup = new mapboxgl.Popup({ offset: [0, -15] }) // TODO: Close it when submit button
      .setLngLat(e.lngLat)
      .setHTML(
        '<h3>' + "Add Restaurant:" + '</h3>' + 
        '<input id="addGroupInput" placeholder="name">'+ 
        '<input id="descriptionGroup" placeholder="description">'+ 
        `<button class="btn btn-primary" onClick="addRestaurantFromMap(${lng},${lat})">Add</button>`)
      .addTo(map);
    return;
  }

  var feature = features[0];
  console.log(features)
  popup = new mapboxgl.Popup({ offset: [0, 0] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      '<h3>' + feature.properties.title + '</h3> '+
      '<p>' + feature.properties.description + '</p>' +
      `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createGroupModal" `+
      `data-rest-name="${feature.properties.title}" data-rest-id="${feature.properties.RID}">Add Group</button>`)
    .addTo(map);
});

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
  },
    trackUserLocation: true
  })
);

// Add navigation controls
map.addControl(new mapboxgl.NavigationControl());

// Search input
var search = new MapboxGeocoder(
  {
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: {
      color: 'orange'
    },
  });
map.addControl(search, 'top-left');

function flyTo(coordinates) {
  map.flyTo({
    center: [coordinates[0], coordinates[1]],
    zoom: 18,
    curve: 1,
    pitch: 45, // pitch in degrees
    bearing: 0, // bearing in degrees
    essential: true 
  }); 
};

function updateMap() {
  getMapPoints();
}

$('#list-map').on('shown.bs.tab', function (e) {
  $('.mapboxgl-ctrl-geocoder').show();
});
$('#list-map').on('hide.bs.tab', function (e) {
  $('.mapboxgl-ctrl-geocoder').hide();
});

var isDarkModeON = false;
var textColor = '#000';
function setDarkStyle() {
  var style;
  if (isDarkModeON) {
    textColor = '#000';
    style = 'mapbox://styles/xavisanta/ck7i792ip5snm1jsh5q9mtf37';
  } else {
    textColor = '#fff';
    style = 'mapbox://styles/xavisanta/ck789zwyd19i81iql3e3qy1lu';
  }

  map.setStyle(style);

  $('#nightModeIcon').toggleClass('far fas');
  isDarkModeON = !isDarkModeON;
}

map.on('style.load', () => {
  const waiting = () => {
    if (!map.isStyleLoaded()) {
      setTimeout(waiting, 100);
    } else {
      try {
        loadMyLayers();
      } catch (e) {
        console.log("error: ", e.message);
      }
    }
  };
  waiting();
});