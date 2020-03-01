var xhr;
const apiPort = 9034;
const apiURL = 'http://127.0.0.1';

function getMapPoints() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${apiURL}:${apiPort}/points`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

function postRestaurant(geoPoint) {
  xhr = new XMLHttpRequest();
  xhr.open('POST', `${apiURL}:${apiPort}/point`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(geoPoint));
  xhr.onreadystatechange = processRequest;
  if(popup !== undefined) {
    popup.remove()
  }
}

function processRequest() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    geojson = JSON.parse(xhr.responseText);
    refreshMap();
    updateRestaurantList();
  }
}

function refreshMap() {
  if(map !== undefined) {
    map.getSource('restaurants-source').setData(geojson); // Refresh map with new coordinate
  }
}

function addRestaurantFromMap(lng, lst) {
  var restaurantName = $('#addGroupInput').val();
  var descriptionGroup = $('#descriptionGroup').val();
  var geoPoint = {
    type: "Feature",
    properties: {
      title: restaurantName,
      description: descriptionGroup
    },
    geometry: {
      coordinates: [
        lng,
        lst
      ],
      type: "Point"
    }
  }
  postRestaurant(geoPoint); 
}
