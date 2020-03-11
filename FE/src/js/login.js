// listen for auth status changes
auth.onAuthStateChanged(user => {
  console.log(user)
  if(user) {
    openApp();
  } else {
    $('.logged-in').hide();
    $('.logged-out').show();
  }
});

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
  var email = $('#person-email-login').val();
  var password = $('#person-pass-login').val();
  if(!isValidString(username)) {
    alert('Username invalid')
    return;
  }
  
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // sendLogin();
  });
  
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
  var email = $('#person-email-register').val();
  var password = $('#person-pass-register').val();
  if(!isValidString(username)) {
    alert('Username invalid')
    return;
  }
  
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // sendRegistration();
  });
  
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

  $('.main').hide(800);
  $('.sign-in').hide(800);
  $('.landing').hide(800);
}

function openLogin() {
  $('.sign-in').show();

  $('.main').hide(800);
  $('.sign-up').hide(800);
  $('.landing').hide(800);
}

// Log out
function logOut() {
  auth.signOut().then(() => {
    console.log('user signed out')
  });
}
