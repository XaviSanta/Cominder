var geojson = []; // Points in the map
var groupsList = [];
var offers = [
  {
    restaurant: 'El Mussol',
    offer: '30%',
    description: '30% for big groups (+4 people).',
    extraInfo: 'Oferta válida hasta 20/03/2020'
  },
  {
    restaurant: 'Tagliatella',
    offer: '50%',
    description: "Use the code 'COMINDER2' and come with another person for a 50% discount.",
    extraInfo: 'Only in March'
  },
  {
    restaurant: 'TaElWei',
    offer: '80%',
    description: 'Come with an asian friend and get a 80% discount in the next meal!!',
    extraInfo: 'A-pass only valid until coronavirus ends.'
  },
  {
    restaurant: 'McDonalds',
    offer: '30%',
    description: '30% for big groups (+4 people).',
    extraInfo: 'Oferta válida hasta 20/03/2020'
  }
];
var popup;
var map;

function goHome() {
  connection === null ? showLanding() : openApp(); 
}

function showLanding() {
  $('.landing').show();

  $('.sign-up').hide();
  $('.main').hide();
  $('.sign-in').hide();
}

function openApp() {
  $('.offers').show();
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

function refreshMap() {
  if(map !== undefined) {
    map.getSource('restaurants-source').setData(geojson); // Refresh map with new coordinate
  }
}