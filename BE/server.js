var db = require('./databases');
const express = require('express')
const http = require('http');
// const firebase = require("firebase");
// const firebaseConfig = require('./firebaseConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server});

const Port = 9035;

// firebase.initializeApp(firebaseConfig);

var points = db.points;// TODO: Use DB
var groups = db.groupsList; // TODO: Use DB
var offers = db.offersList; // TODO: Use DB
var chats = db.chatsList; // TODO: Use DB

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ------------------ END POINTS -------------------------------

// GET 
app.get('/info', (req, res) => {
  res.json({points, groups, offers});
});
//    all the restaurants in the map
app.get('/points', (req, res) => {
  res.json(points);
});
//    all the groups created
app.get('/groups', (req, res) => {
  res.json(groups);
});
//    all the offers created
app.get('/offers', (req, res) => {
  res.json(offers);
});
//    specified chat
app.get('/chat/:id', (req, res) => {
  var result = getChat(req.params.id);
  res.json(result);
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
  var group = req.body;
  var result = createGroup(group)
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


// SERVICE:
function createGroup(group) {
  group.id = groups[groups.length-1].id + 1; // Generate id for the group
  groups.push(group);
  addChat(group);
  return {
    result: groups,
    id: group.id
  };
}

function addChat(group) {
  chats.push({
    id: group.id,
    title: group.title,
    userLimit: group['max-members'],
    usersJoined: 1,
    messages: [
      {
        type: 'Notification',
        author: '',
        content: 'Group created'
      },
    ]
  });
}

function getChat(id) {
  var chat = chats.find(c => c.id == id);
  if(chat === undefined) {
    return {
      errMsg: 'This chat no longer exists',
      result: null,
    };
  }
  return {
    errMsg: null,
    result: chats.find(c => c.id == id),
  };
}
