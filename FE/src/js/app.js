var userType = ''; // Will be type restaurant or client
var username = 'Username'; // Name
var geojson = []; // Points in the map
var popup;
var map;

$('.loginForm-r').submit(function() {
  username = $('#rest-username-login').val();
  sendLogin();
  return false;
});
$('.loginForm-p').submit(function() {
  username = $('#person-username-login').val();
  sendLogin();
  return false;
});

$('.registerForm-r').submit(function() {
  username = $('#rest-username-register').val();
  sendRegistration();
  return false;
});
$('.registerForm-p').submit(function() {
  username = $('#person-username-register').val();
  sendRegistration();
  return false;
});

$('.sign-up-btn').click(function() {
  openRegistration();

});

$('.sign-in-btn').click(function() {
 openLogin();
});

$('#home-logo').click(function() {
  goHome();
});

$('.loginForm').submit(function(e) {
  sendLogin();
  return false;
});

$('.registerForm').submit(function(e) {
  sendRegistration();
  return false;
});



function goHome() {
  connection === null ? showLanding() : openApp(); 
}

function showLanding() {
  $('.landing').show();
  $('.sign-up').hide();
  $('.main').hide();
  $('.sign-in').hide();
}

function openRegistration() {
  $('.sign-up').show();
  $('.main').hide();
  $('.sign-in').hide();
  $('.landing').hide();
  $('.back-ground').show();
  $('.login-page').show();

}

function openLogin() {
  $('.sign-in').show();
  $('.main').hide();
  $('.sign-up').hide();
  $('.landing').hide();
  $('.back-ground').show();
  $('.login-page').show();
}

function openApp() {  
  $('.main').show();
  $('#sign-in-btn').hide();
  $('#sign-up-btn').hide();
  $('#username-btn').html(username);
  $('#username-btn').show();
  $('.map').load('./map.html');
  $('.sign-in').hide();
  $('.sign-up').hide();
  $('.landing').hide();
  
  $('.login-page').hide();
  $('.back-ground').hide();
  
}

function sendRegistration() {
  connect();
}

function sendLogin() {
  connect();
}


function updateMap() {
  getMapPoints();
}
