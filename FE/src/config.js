mapboxgl.accessToken = 'pk.eyJ1IjoieGF2aXNhbnRhIiwiYSI6ImNrNzIwejBjaDA0aTIzZm53OG1jM3o5MXoifQ._rJdKgn_Nx_wsi7blKBlCQ'; // replace this with your access token
var connected = false;
var points = []; // Points in the map
var geojson = {
  "type": "FeatureCollection",
  "features": points,
};

var groupsList = [];
var offers = [];
var chatId;
var popup;
var map;
var userType = ''; // Will be type restaurant or client
var username = 'Username'; // Name
var restName = null; // Restaurant name
var coordinatesMyRestaurant = [];
var myRestID = null;
const Port = 9035;
var connection = null;

// // SERVER ECV:
// const apiURL = 'https://ecv-etic.upf.edu/node/';
// const PATH = `${apiURL}${Port}`;
// var SocketURL = 'wss://ecv-etic.upf.edu/node/9035/ws/';

// TEST LOCAL: 
const apiURL = 'http://127.0.0.1';
const PATH = `${apiURL}:${Port}`;
var SocketURL = 'ws://127.0.0.1:9035';
