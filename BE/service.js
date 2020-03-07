var db = require('./databases');

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

function getChat(id, username) {
  if (username === undefined) {
    return {
      errMsg: 'Username not valid',
      result: null,
    };
  }

  var chat = chats.find(c => c.id == id);
  var group = groups.find(c => c.id == id);
  if(chat === undefined) {
    return {
      errMsg: 'This chat no longer exists',
      result: null,
    };
  }

  if(!group.users.includes(username)) {
    if(group.members < group['max-members']) {
      group.members++;
      group.users.push(username)
    } else {
      return {
        errMsg: 'The chat is full',
        result: null,
      };
    }
      
  }
  return {
    errMsg: null,
    result: chats.find(c => c.id == id),
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

function getGroupsByUsername(username) {
  return groups.filter(g => g.users.includes(username) === true);
}
// ------------------------------------------
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

function addMessageToChat(msg) {
  chats.find(c => c.id === msg.chatId)
    .messages.push({
      author: msg.author,
      content: msg.content,
    });

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