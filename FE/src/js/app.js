function goHome() {
}

function showLanding() {
  $('.logged-in').show();
  $('.logged-out').hide();
}

function openApp() {
  $(window).scrollTop(0);
  getInitInfo();
  $('.navbar-collapse').collapse('hide');
  
  $('#username-btn').html(username);
  $('.logged-in').show();
  $('.logged-out').hide();

  $('.map').load('./map.html');

  $('.sign-in').hide();
  $('.sign-up').hide();
  $('.landing').hide();

  // Hide or show the things that differ from restaurants and clients
  if(userType === 'restaurant') {
    $('.rest-type').show();
    $('.client-type').hide();
  } else {
    $('.rest-type').hide();
    $('.client-type').show();
  }
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

function showUserInfo() {
  
  
}

$('.account-details').on('show.bs.modal', function (event) {
  showUserInfo();
});

