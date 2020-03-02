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
      goAndShowRestaurant(r.geometry.coordinates, name)
    }
    container.appendChild(li); //to the DOM
  });
}

function goAndShowRestaurant(coordinates, name) {
  flyTo(coordinates);
  openGroupsOfRestaurant(name);
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

function updateOffersCarousel() {
  var container = document.querySelector('.card-deck.offers');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  // Append offers to the container
  offers.forEach(o => {
    var temp = document.querySelector('#templates .card-offer');
    var card = temp.cloneNode(true);
    card.getElementsByClassName('card-header')[0].innerText = `${o.restaurant} ${o.offer}`;
    card.getElementsByClassName('card-text')[0].innerText = o.description;
    card.getElementsByClassName('text-muted')[0].innerText = o.extraInfo;
    card.onclick = function() { 
      var restaurant = geojson.features.filter(r => r.properties.title === o.restaurant)
      var coordinates = restaurant[0].geometry.coordinates;
      goAndShowRestaurant(coordinates, o.restaurant);
    }
    container.appendChild(card); //to the DOM
  });
}