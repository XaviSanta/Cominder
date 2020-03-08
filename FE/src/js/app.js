function goHome() {
  connection === null ? showLanding() : openApp(); 
}

function showLanding() {
  $('.landing').show(800);

  $('.sign-up').hide(800);
  $('.main').hide(800);
  $('.sign-in').hide(800);
}

function openApp() {
  $(window).scrollTop(0);
  getInitInfo();
  
  $('.offers-container').show(800);
  $('.main').show(800);
  $('#sign-in-btn').hide(800);
  $('#sign-up-btn').hide(800);
  $('#username-btn').html(username);
  $('.btns-after-login').show(800);

  $('.map').load('./map.html');

  $('.sign-in').hide(800);
  $('.sign-up').hide(800);
  $('.landing').hide(800);
}

function refreshMap() {
  if(map !== undefined) {
    if(map.getSource('restaurants-source') !== undefined)
      map.getSource('restaurants-source').setData(geojson); // Refresh map with new coordinate
  }
}

// Remove all the childs of a node to insert them later maybe
function removeChilds(container) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

// Collapse the menu when clicking an option from it
$('.nav-item').on('click', function(){
  $('.navbar-collapse').collapse('hide');
});

// Validate inputs to avoid injection
function isValidString(str, invalidCharacters = ['<', '>', '+', ',', '.', "'", '_', '-', '&', '=']) {
  var arr = invalidCharacters;
  for (var i = arr.length - 1; i >= 0; --i) {
    if (str.indexOf(arr[i]) != -1) {
      alert(`The character ${arr[i]} is not allowed`); 
      return false;
    }
  }
  return str !== '';
}