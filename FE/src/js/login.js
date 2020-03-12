// listen for auth status changes
auth.onAuthStateChanged(user => {
  if(user) {
    try {
      setUserAsync(user);
    } catch (err) {
      alert(err)
    }
  } else {
    $('.logged-in').hide();
    $('.logged-out').show();
  }
});

async function setUserAsync(user) {
  let usersRef = db.collection('users');
  let doc = await usersRef.doc(user.uid).get();

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
}

$('.loginForm').submit(function() {
  var email = $('#email-login').val();
  var password = $('#pass-login').val();
  
  // Sign in
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
  var restaurant = $('#rest-name-register').val();
  var email =    $('#rest-email-register').val();
  var password = $('#rest-pass-register').val();
  if(!isValidString(username)) {
    alert('Username invalid')
    return;
  }

  try {
    createUserDBAsync(email, password, username, 'restaurant', restaurant);
  } catch (error) {
    alert(error)
  }
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
  
  try {
    createUserDBAsync(email, password, username, 'person');
  } catch (error) {
    alert(error)
  }
  return false;
});

async function createUserDBAsync(email, password, username, type, restaurant = null) {
  let cred = await auth.createUserWithEmailAndPassword(email, password);
  return db.collection('users').doc(cred.user.uid).set({
    username,
    type,
    restaurant,
  });
}

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
