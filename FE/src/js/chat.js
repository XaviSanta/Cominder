function openChat(infoChat) { // TODO : CHANGE pass id
  // Hide the list of groups and restaurants when opening the chat
  $('.tab-pane.fade.active.show').removeClass('active');
  $('.tab-pane.fade.active.show').removeClass('show');
  $('.nav-item.nav-link').removeClass('active');
  $('.nav-item.nav-link').removeClass('show');
  // Put the messages in the UI chat
  updateChatAsync(infoChat);

  // Show the chat
  $('#chat-tab').tab('show');

  // Scroll bottom
  let container = document.querySelector('#chat-messages');
  container.scrollTop = container.scrollHeight;
  
  // Set connected dot color 
  if(connection.readyState === 1) {
    $('#connectedDot').css('color', 'chartreuse');
  } else {
    $('#connectedDot').css('color', 'red');
  }
}

async function updateChatAsync(infoChat) {
  let groupDoc = await db.collection('groups').doc(infoChat.id).get();
  $('.chat-title-group-name').text(infoChat.title);
  updateChatUsersConnected(groupDoc.data());
  removeChilds(document.querySelector('#chat-messages'));
  infoChat.messages.forEach(m => {
    appendMessage(m);
  });
}
function updateChatUsersConnected(data) {
  $('.chat-title-users-connected').text(`${data.users.length}/${data['max-members']}`);
}

$('.form-inline').submit(function() {
  var msg = $('#input-message').val();
  sendMessage(msg);
  return false;
});

function closeChat() {
  $('#list-map').trigger('click');
}

function sendMessage(msg) {
  connection.send(JSON.stringify({
    type: 'chat-message',
    author: username,
    content: msg,
    chatId: chatId,
  }));
  appendMessage({author:username, content:msg});
  clearInput();
}

function appendMessage(msg) {
  // TODO: Style message with username and text
  var container = document.querySelector('#chat-messages');
  var temp = document.querySelector('#templates .message');
  var div = temp.cloneNode(true);
  div.querySelector('.author-message').innerText = msg.author;
  div.querySelector('.content-message').innerText = msg.content;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function clearInput() {
  document.getElementById('input-message').value = '';
}

$('#input-message').focus(function() {
  $('.offers').hide(800);
  $('.offers-container .expand-contract i').attr('class', 'fas fa-angle-double-up');
});
$('#input-message').blur(function() {
  if($('.offers').css('display') != 'none') {
    $('.offers').show(800);
    $('.offers-container .expand-contract i').attr('class', 'fas fa-angle-double-down');
  }
});