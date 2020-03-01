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
}

function openLogin() {
  console.log("asdfasdf")
  $('.sign-in').show();

  $('.main').hide();
  $('.sign-up').hide();
  $('.landing').hide();
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

function sendRegistration() {
  connect();
}

function sendLogin() {
  connect();
}

function updateMap() {
  getMapPoints();
}