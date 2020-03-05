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

function sendRegistration() {
  connect();
}

function sendLogin() {
  connect();
}

function openRegistration() {
  $('.sign-up').show();

  $('.main').hide();
  $('.sign-in').hide();
  $('.landing').hide();
}

function openLogin() {
  $('.sign-in').show();

  $('.main').hide();
  $('.sign-up').hide();
  $('.landing').hide();
}