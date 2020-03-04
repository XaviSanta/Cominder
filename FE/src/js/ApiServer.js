var xhr;

// GETTERS
function getInitInfo() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${PATH}/info`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

function getMapPoints() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${PATH}/points`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

function getGroups() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${PATH}/groups`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

// POSTS
function postRestaurant(geoPoint) {
  xhr = new XMLHttpRequest();
  xhr.open('POST', `${PATH}/point`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(geoPoint));
  xhr.onreadystatechange = processRequest;
  if(popup !== undefined) {
    popup.remove()
  }
}

function postNewGroup(group) {
  xhr = new XMLHttpRequest();
  xhr.open('POST', `${PATH}/group`, true);
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