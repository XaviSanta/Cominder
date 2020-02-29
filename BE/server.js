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

let points = [];
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/points', (req, res) => {
  res.json(points);
});

app.post('/point', (req, res) => {
  const point = req.body;
  points['features'].push(point);
  res.send('Point is added to the database');
});

app.listen(AppPort, () => console.log(`Hello world app listening on port ${AppPort}!`));


// WEB SOCKET FOR CHAT ---------------
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

points = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "El Mussol",
        "description": "A restaurant to eat owls"
      },
      "geometry": {
        "coordinates": [2.1915381401222476, 41.40480971528061],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Tagliatella",
        "description": "A fancy restaurant to eat good pasta"
      },
      "geometry": {
        "coordinates": [2.192299385042361, 41.404939986348154],
        "type": "Point"
      }
    },
    
  ],
}
