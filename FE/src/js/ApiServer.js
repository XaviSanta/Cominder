var xhr;
const apiPort = 9034;
const apiURL = 'http://127.0.0.1';

// GETTERS
function getInitInfo() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${apiURL}:${apiPort}/info`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

function getMapPoints() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${apiURL}:${apiPort}/points`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

function getGroups() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${apiURL}:${apiPort}/groups`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

// POSTS
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

function postNewGroup(group) {
  xhr = new XMLHttpRequest();
  xhr.open('POST', `${apiURL}:${apiPort}/group`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(group));
  xhr.onreadystatechange = processRequest;
  if(popup !== undefined) {
    popup.remove()
  }
}

// HANDLE RESPONSE
function processRequest() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var endpoint = xhr.responseURL.substr(xhr.responseURL.lastIndexOf('/') + 1);
    var res = JSON.parse(xhr.responseText);
    switch (endpoint) {
      case 'info':
        geojson = res.points;
        groupsList = res.groups;
        offers = res.offers;
        refreshMap();
        updateRestaurantList();
        updateOffersCarousel();
        break;
      case 'points':
      case 'point':
        geojson = res;
        refreshMap();
        updateRestaurantList();
        break;
      case 'groups':
        groupsList = res;
        updateGroupsList();
        break;
      default:
        break;
    }
  }
}