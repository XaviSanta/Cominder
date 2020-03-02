function openChat(group) {
  // Hide the list of groups and restaurants when opening the chat
  $('.tab-pane.fade.active.show').removeClass('active');
  $('.tab-pane.fade.active.show').removeClass('show');

  // Show the chat
  $('#chat-tab').tab('show');
  
  // Change chat title
  $('.chat-title-group-name').text(group.title);
  $('.chat-title-users-connected').text(`${group.members}/${group["max-members"]}`);
}

$('.form-inline').submit(function() {
  var msg = $('#input-message').val();
  sendMessage(msg);
  return false;
});

function sendMessage(msg) {
  appendMessage(msg);
}

function appendMessage(msg) {
  var container = document.getElementById('chat-messages');
  var temp = document.querySelector('#templates .message');
  var div = temp.cloneNode(true);
  div.textContent = msg;
  container.appendChild(div);
  clearInput();
}

function clearInput() {
  document.getElementById('input-message').value = '';
}