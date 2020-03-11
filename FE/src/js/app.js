function goHome() {
  connection === null ? showLanding() : openApp(); 
}

function showLanding() {
  $('.logged-in').show();
  $('.logged-out').hide();
}

function openApp() {
  $(window).scrollTop(0);
  getInitInfo();
  $('.navbar-collapse').collapse('hide');
  
  $('.offers-container').show();
  $('.main').show();
  $('#sign-in-btn').hide();
  $('#sign-up-btn').hide();
  $('#username-btn').html(username);
  $('.logged-in').show();
  $('.logged-out').hide();

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
  const html = `
    <div>Logged in as <span style:>${username}</span></div>
  `;
  $('.account-details .modal-body').html(html);
}

$('.account-details').on('show.bs.modal', function (event) {
  showUserInfo();
});