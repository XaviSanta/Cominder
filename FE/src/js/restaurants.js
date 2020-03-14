function updateRestaurantList() {
  var container = document.getElementById('restaurant-list-group');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  // Append restaurants to the container list
  var restaurants = points;
  restaurants.forEach(r => {
    var name = r.properties.title;
    var temp = document.querySelector('#templates .restaurant-li');
    var li = temp.cloneNode(true);
    var numGroups = groupsList.filter(g => g.restaurant === name).length;
    li.getElementsByClassName('badge')[0].innerText = numGroups;
    li.getElementsByClassName('name-group-template')[0].innerText = name;
    li.querySelector('a').onclick = function() {
      goAndShowRestaurant(r.geometry.coordinates, r.properties.RID)
    }
    container.appendChild(li); //to the DOM
  });
}

function goAndShowRestaurant(coordinates, RID) {
  flyTo(coordinates);
  openGroupsOfRestaurant(RID);
}

function addRestaurantFromMap(lng, lst) {
  var restaurantName = $('#addGroupInput').val();
  var descriptionGroup = $('#descriptionGroup').val();
  var newPointRef = db.collection('points').doc();
  var geoPoint = {
    type: "Feature",
    properties: {
      title: restaurantName,
      RID: newPointRef.id,
      description: descriptionGroup,
    },
    geometry: {
      coordinates: [
        lng,
        lst
      ],
      type: "Point"
    },
    groups: [],
  }

  newPointRef.set(geoPoint);
  if (popup !== undefined) {
    popup.remove();
  }
}

// Listener of database changes
db.collection('points')
  .onSnapshot(function (snapShot) {
    points = [];
    snapShot.forEach(doc =>  {
      points.push(doc.data());
    });
    geojson.features = points;
    refreshMap();
    updateRestaurantList();
});