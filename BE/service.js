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
  getChat,
  getGroupsByUsername,
  addMessageToChat,
}