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

// ------------------ GETTERS -------------------------------
//    all info
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
app.get('/chat/:id/:username', async (req, res) => {
  const result = await service.getChat(req.params.id, req.params.username);
  res.json(result);
});
//    my groups
app.get('/my-groups/:username', async (req, res) => {
  const result = await service.getGroupsByUsername(req.params.username);
  res.json(result);
});

// ------------------ POSTS -------------------------------
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
var connections = []; // List of connections users connected to the webSocket
wss.on('connection', (ws) => {
  ws.send(JSON.stringify({type: 'LoginOK', data: 'Hi there, I am a WebSocket server'}));
  var username = undefined;
  var index;

  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    switch (msg.type) {
      case 'login':
        index = connections.push(ws) - 1; 
        username = msg.data.username;
        console.log('New WebSocket User: ' + username);
        break;

      case 'chat-message':
        service.addMessageToChat(msg);
        wss.clients.forEach(client => {
          // TODO: If the client is in the chat group:
          if (client != ws) {
            client.send(JSON.stringify({
              type: 'chat-message', 
              content: msg.content,
              author: msg.author,
              chatId: msg.chatId,
            }));
          }
        });
        break;
    }
  });

  ws.on('close', (connection) => {
    console.log('User is gone');

    // Remove user from the list
    connections.splice(index, 1);
    console.log('connetion', connections.length)
  });
});

//start our server
server.listen(process.env.PORT || Port, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});