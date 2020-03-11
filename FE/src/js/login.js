// listen for auth status changes
auth.onAuthStateChanged(user => {
  if(user) {
    username = user.email;
    connect(); 
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
  })
  .catch(err => {
    alert(err);
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
  
  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
    // sendRegistration();
    })
    .catch(err => {
      alert(err);
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

function loginWgoogle() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
