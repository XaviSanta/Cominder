var geojson = []; // Points in the map
var groupsList = [];
var offers = [];
var popup;
var map;

const Port = 9035;
const apiURL = 'https://ecv-etic.upf.edu/node/';
const PATH = `${apiURL}${Port}`;
// const apiURL = 'http://127.0.0.1';
// const PATH = `${apiURL}:${Port}`;

var connection = null;
var SocketURL = 'wss://ecv-etic.upf.edu/node/9035/ws/';
// var SocketURL = 'ws://127.0.0.1:9035';
