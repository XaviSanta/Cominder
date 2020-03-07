$('.loginForm-r').submit(function() {
  username = $('#rest-username-login').val();
  if(!isValidString(username)) {
    alert('Username invalid')
    return;
  }
  
  sendLogin();
  return false;
});
$('.loginForm-p').submit(function() {
  username = $('#person-username-login').val();
  if(!isValidString(username)) {
    alert('Username invalid')
    return;
  }
  
  sendLogin();
  return false;
});

$('.registerForm-r').submit(function() {
  username = $('#rest-username-register').val();
  if(!isValidString(username)) {
    alert('Username invalid')
    return;
  }
  
  sendRegistration();
  return false;
});
$('.registerForm-p').submit(function() {
  username = $('#person-username-register').val();
  if(!isValidString(username)) {
    alert('Username invalid')
    return;
  }
  
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