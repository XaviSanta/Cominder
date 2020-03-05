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

function getChat(id) {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${PATH}/chat/${id}`, true);
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
    var endpoint = xhr.responseURL.slice(PATH.length + 1);
    endpoint = endpoint.lastIndexOf('/') === -1 ? endpoint : endpoint.slice(0, endpoint.lastIndexOf('/'));
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
      case 'group':
        groupsList = res.result;
        updateGroupsList(res.result.find(g => g.id === res.id).restaurant); // Get name of the restaurant to filter on the list
        break;
      case 'chat':
        if(res.errMsg === null){
          openChat(res.result);
        } else {
          alert(res.errMsg);
        }
          
        break;
      default:
        console.warn(res)
        console.log(endpoint)
        break;
    }
  }
}