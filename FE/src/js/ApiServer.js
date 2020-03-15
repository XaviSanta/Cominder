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
  updateGroupsList(groupsList);
  // xhr = new XMLHttpRequest();
  // xhr.open('GET', `${PATH}/groups`, true);
  // xhr.send();
  // xhr.onreadystatechange = processRequest;
}

function getChat(id) {
  chatId = id;
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${PATH}/chat/${id}/${username}`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

function getMyChats() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${PATH}/my-groups/${username}`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

// POSTS
function postRestaurant(geoPoint) {
  // xhr = new XMLHttpRequest();
  // xhr.open('POST', `${PATH}/point`, true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.send(JSON.stringify(geoPoint));
  // xhr.onreadystatechange = processRequest;
  // if(popup !== undefined) {
  //   popup.remove()
  // }
}

function postNewGroup(group) {
  // xhr = new XMLHttpRequest();
  // xhr.open('POST', `${PATH}/group`, true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.send(JSON.stringify(group));
  // xhr.onreadystatechange = processRequest;
  // if(popup !== undefined) {
  //   popup.remove()
  // }
}

// HANDLE RESPONSE
function processRequest() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var endpoint = getEndpoint(xhr);
    var res = JSON.parse(xhr.responseText);
    switch (endpoint) {
      case 'info':
        // points = res.points;
        // geojson = {
        //   "type": "FeatureCollection",
        //   "features": points,
        // };
        // groupsList = res.groups;
        // offers = res.offers;
        // refreshMap();
        // updateRestaurantList();
        // updateOffersCarousel();
        break;
      case 'points':
      case 'point':
        // points = res;
        // geojson = {
        //   "type": "FeatureCollection",
        //   "features": points,
        // };
        // refreshMap();
        // updateRestaurantList();
        break;
      case 'groups':
        // groupsList = res;
        // updateGroupsList(groupsList);
        break;
      case 'group':
        // groupsList = res.result;
        // updateGroupsList(groupsList, res.result.find(g => g.id === res.id).restaurant); // Get name of the restaurant to filter on the list
        break;
      case 'my-groups':
        updateGroupsList(res);
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

function getEndpoint(xhr) {
  var ep = xhr.responseURL.slice(PATH.length + 1);
  return ep.indexOf('/') === -1 ? 
    ep :
    ep.slice(0, ep.indexOf('/'))
}