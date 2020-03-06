var service = require('./service');
const express = require('express')
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server});

const Port = 9035;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ------------------ END POINTS -------------------------------

// GET 
app.get('/info', (req, res) => {
  const result = service.getInfo();
  res.json(result);
});
//    all the restaurants in the map
app.get('/points', (req, res) => {
  const result = service.getPoints();
  res.json(result);
});
//    all the groups created
app.get('/groups', (req, res) => {
  const result = service.getGroups();
  res.json(result);
});
//    all the offers created
app.get('/offers', (req, res) => {
  const result = service.getOffers();
  res.json(result);
});
//    specified chat
app.get('/chat/:id', (req, res) => {
  const result = service.getChat(req.params.id);
  res.json(result);
});

// POST 
//    new restaurant in map
app.post('/point', (req, res) => {
  const result = service.addPoint(req.body);
  res.json(result);
});
//    new group
app.post('/group', (req, res) => {
  var result = service.addGroup(req.body)
  res.json(result);
});

// ------------------  WEB SOCKET  -------------------------------
wss.on('connection', (ws) => {
  ws.send(JSON.stringify({type: 'LoginOK', data: 'Hi there, I am a WebSocket server'}));

  ws.on('message', (message) => {
    if (true) {
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

  
});

//start our server
server.listen(process.env.PORT || Port, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});