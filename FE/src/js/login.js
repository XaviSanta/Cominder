// listen for auth status changes
auth.onAuthStateChanged(user => {
  if(user) {
    // GET DATABASE USER
    db.collection('users').doc(user.uid).get().then(doc => {
      username = doc.data().username;
      userType = doc.data().type;
      restName = doc.data().restaurant;
      const html = `
        <div>Username: <span>${username}</span></div>
        <div>Emal: <span>${user.email}</span></div>
        <div>Type: <span>${userType}</span></div>
        `;
      $('.account-details .modal-body').html(html);
      
      connect(); // TODO: connect on groups not on global
      openApp();
    });
  } else {
    $('.logged-in').hide();
    $('.logged-out').show();
  }
});

$('.loginForm').submit(function() {
  var email = $('#email-login').val();
  var password = $('#pass-login').val();
  
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // sendLogin();
  })
  .catch(err => {
    alert(err);
  });
  
  return false;
});

$('.registerForm-r').submit(function() {
  username =     $('#rest-username-register').val();
  var restName = $('#rest-name-register').val();
  var email =    $('#rest-email-register').val();
  var password = $('#rest-pass-register').val();
  if(!isValidString(username)) {
    alert('Username invalid')
    return;
  }
  
  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        username: username,
        type: 'restaurant',
        restaurant: restName,
      });
    })
    .catch(err => {
      alert(err);
    });
  
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
      return db.collection('users').doc(cred.user.uid).set({
        username: username,
        type: 'person',
        restaurant: null,
      });
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
    console.log(result)
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    console.log(error.message)

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
