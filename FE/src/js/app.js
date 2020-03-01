var geojson = []; // Points in the map
var popup;
var map;

function goHome() {
  connection === null ? showLanding() : openApp(); 
}

function showLanding() {
  $('.landing').show();

  $('.sign-up').hide();
  $('.main').hide();
  $('.sign-in').hide();
}



function openApp() {
  $('.main').show();
  $('#sign-in-btn').hide();
  $('#sign-up-btn').hide();
  $('#username-btn').html(username);
  $('.btns-after-login').show();

  $('.map').load('./map.html');

  $('.sign-in').hide();
  $('.sign-up').hide();
  $('.landing').hide();
}

function updateMap() {
  getMapPoints();
}

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
    var article = temp.cloneNode(true);
    var numGroups = groupsList.filter(g => g.restaurant === name).length;
    article.getElementsByClassName('badge')[0].innerText = numGroups;
    article.getElementsByClassName('name-group-template')[0].innerText = name;
    article.querySelector('a').onclick = function() { 
      map.flyTo({
        center: [r.geometry.coordinates[0], r.geometry.coordinates[1]],
        zoom: 18,
        curve: 1,
        pitch: 45, // pitch in degrees
        bearing: 0, // bearing in degrees
        essential: true 
      }); 
      openGroupsOfRestaurant(name);
    }
    container.appendChild(article); //to the DOM
  });
}

var groupsList = [
    {
      "restaurant": "El Mussol",
      "title": "Student group",
      "members" : 2,
      "max-members" : 4,
    },
    {
      "restaurant": "El Mussol",
      "title": "English group",
      "members" : 1,
      "max-members" : 4,
    },
    {
      "restaurant": "El Mussol",
      "title": "Date",
      "members" : 1,
      "max-members" : 2,
    },
    {
      "restaurant": "Tagliatella",
      "title": "Date",
      "members" : 1,
      "max-members" : 2,
    },
    {
      "restaurant": "Tagliatella",
      "title": "Over 25",
      "members" : 3,
      "max-members" : 4,
    },
    {
      "restaurant": "Upf",
      "title": "tuppers",
      "members" : 3,
      "max-members" : 6,
    },
    {
      "restaurant": "McDonalds",
      "title": "russians",
      "members" : 1,
      "max-members" : 3,
    },
    {
      "restaurant": "TaElWei",
      "title": "Coronavirus",
      "members" : 1,
      "max-members" : 3,
    },
  ];


function openGroupsOfRestaurant(name) {
  $('#list-groups').tab('show');
  updateGroupsList(name);
}

function updateGroupsList(nameFilter = null) {
  var container = document.getElementById('groups-list-group');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  // Append groups to the container list
  var groups = groupsList;
  if(nameFilter !== null) groups = groups.filter(g => g.restaurant === nameFilter);
  groups.forEach(g => {
    var temp = document.querySelector('#templates .group-li');
    var article = temp.cloneNode(true);
    article.getElementsByClassName('name-group-template')[0].innerText = g.title;
    article.getElementsByClassName('badge')[0].innerText = `${g.members}/${g["max-members"]}`;
    container.appendChild(article); //to the DOMs
  });
}