var db = require('./databases');
const express = require('express')
const http = require('http');
const firebase = require("firebase");
const firebaseConfig = require('./firebaseConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({
  server
});

const AppPort = 9034;
const WsPort = 9035;

firebase.initializeApp(firebaseConfig);

var points = db.points;// TODO: Use firebase
var groups = db.groupsList;// TODO: Use firebase
var restaurantOffers = db.restaurantOffers;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ------------------ END POINTS -------------------------------

// GET 
app.get('/info', (req, res) => {
  res.json({points, groups});
});
//    all the restaurants in the map
app.get('/points', (req, res) => {
  res.json(points);
});
//    all the groups created
app.get('/groups', (req, res) => {
  res.json(groups);
});

// POST 
//    new restaurant in map
app.post('/point', (req, res) => {
  const point = req.body;
  points['features'].push(point);
  res.json(points);
});
//    new group
app.post('/group', (req, res) => {
  const group = req.body;
  groups.push(group);
  res.json(groups);
});

app.listen(AppPort, () => console.log(`Hello world app listening on port ${AppPort}!`));

// ------------------  WEB SOCKET  -------------------------------
wss.on('connection', (ws) => {
  //connection is up, let's add a simple simple event
  ws.on('message', (message) => {
    if (true) {
      //send back the message to the other clients
      console.log(message)
      wss.clients
        .forEach(client => {
          if (client != ws) {
            client.send(JSON.stringify({type: 'message', data: message}));
          }
        });

    } else {
      ws.send(`Hello, you sent -> ${message}`);
    }
  });

  //send immediatly a feedback to the incoming connection    
  ws.send(JSON.stringify({type: 'LoginOK', data: 'Hi there, I am a WebSocket server'}));

});

//start our server
server.listen(process.env.PORT || WsPort, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});