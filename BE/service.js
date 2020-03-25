var db = require('./databases');
var firebase = require('firebase');
var firebaseConfig = {
  apiKey: "AIzaSyDMBw3oxC1gDl-tI2NhpAtb-Ziyx8MJOTI",
  authDomain: "cominder-24c77.firebaseapp.com",
  databaseURL: "https://cominder-24c77.firebaseio.com",
  projectId: "cominder-24c77",
};
firebase.initializeApp(firebaseConfig);

// Make auth and firestore references
const fs = firebase.firestore();

var points = db.points;// TODO: Use DB
var groups = db.groupsList; // TODO: Use DB
var offers = db.offersList; // TODO: Use DB
var chats = db.chatsList; // TODO: Use DB

function getInfo() {
  return {
    points, 
    groups, 
    offers
  };
}

function getPoints() {
  return points;
}

function getGroups() {
  return groups;
}

function getOffers() {
  return offers;
}

async function getChat(id, username) {
  if (username === undefined) {
    return {
      errMsg: 'Username not valid',
      result: null,
    };
  }

  var chatRef = fs.collection('chats').doc(id);
  var chatDoc = await chatRef.get();
  var chat = chatDoc.data();
  if(chat === undefined) {
    return {
      errMsg: 'This chat no longer exists',
      result: null,
    };
  }
  
  var groupRef = fs.collection('groups').doc(id);
  var groupDoc = await groupRef.get();
  var group = groupDoc.data();
  if(!group.users.includes(username)) {
    if(group.users.length < group['max-members']) {
      groupRef.update({
        users: firebase.firestore.FieldValue.arrayUnion(username),
      })
    } else {
      return {
        errMsg: 'The chat is full',
        result: null,
      };
    }
  }
  return {
    errMsg: null,
    result: chat,
  };
}

function addPoint(point) {
  points['features'].push(point);
  return points;
}

function addGroup(group) {
  group.id = groups[groups.length-1].id + 1; // Generate id for the group
  groups.push(group);
  addChat(group);
  return {
    result: groups,
    id: group.id
  };
}

async function getGroupsByUsername(username) {
  let groupsRef = fs.collection('groups');
  let groupsDoc = await groupsRef.where("users", "array-contains", username).get();
  let groups = [];
  groupsDoc.forEach(doc => {
    groups.push(doc.data());
  });

  return groups;
}
// ------------------------------------------
function addChat(group) {
  chats.push({
    id: group.id,
    title: group.title,
    // userLimit: group['max-members'],
    // usersJoined: 1,
    messages: [
      {
        type: 'Notification',
        author: '',
        content: 'Group created'
      },
    ]
  });
}

function addMessageToChat(msg) {
  let chatRef = fs.collection('chats').doc(msg.chatId);
  chatRef.update({
    messages: firebase.firestore.FieldValue.arrayUnion({
      author: msg.author,
      content: msg.content,
    }),
  })
}
// ------------------------------------------
module.exports = {
  getInfo,
  getPoints,
  getGroups,
  getOffers,
  getChat,
  getGroupsByUsername,

  addPoint,
  addGroup,
  addMessageToChat,
}