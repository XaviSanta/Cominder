function updateRestaurantList() {
  var container = document.getElementById('restaurant-list-group');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  // Append restaurants to the container list
  var restaurants = geojson.features;
  restaurants.forEach(r => {
    var name = r.properties.title;
    var temp = document.querySelector('#templates .restaurant-li');
    var li = temp.cloneNode(true);
    var numGroups = groupsList.filter(g => g.restaurant === name).length;
    li.getElementsByClassName('badge')[0].innerText = numGroups;
    li.getElementsByClassName('name-group-template')[0].innerText = name;
    li.querySelector('a').onclick = function() { 
      flyTo(r.geometry.coordinates);
      openGroupsOfRestaurant(name);
    }
    container.appendChild(li); //to the DOM
  });
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