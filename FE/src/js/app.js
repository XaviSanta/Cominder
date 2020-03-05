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
  $('.offers').show();
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

function refreshMap() {
  if(map !== undefined) {
    if(map.getSource('restaurants-source') !== undefined)
      map.getSource('restaurants-source').setData(geojson); // Refresh map with new coordinate
  }
}

function removeChilds(container) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}