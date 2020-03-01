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
    article.querySelector('a').innerText = name;
    article.querySelector('a').onclick = function() { 
      map.flyTo({
        center: [r.geometry.coordinates[0], r.geometry.coordinates[1]],
        zoom: 18,
        curve: 1,
        pitch: 45, // pitch in degrees
        bearing: 0, // bearing in degrees
        essential: true 
      }); 
    }
    container.appendChild(article); //to the DOM
    console.log(article)
  });
}