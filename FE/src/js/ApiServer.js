var xhr;

// GETTERS
function getGroups() {
  updateGroupsList(groupsList);
}

function getChat(id) {
  chatId = id;
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${PATH}/chat/${id}/${username}`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

function getMyChats() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', `${PATH}/my-groups/${username}`, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
}

// POSTS

// HANDLE RESPONSE
function processRequest() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var endpoint = getEndpoint(xhr);
    var res = JSON.parse(xhr.responseText);
    switch (endpoint) {
      case 'my-groups':
        updateGroupsList(res);
        break;
      case 'chat':
        if(res.errMsg === null){
          openChat(res.result);
        } else {
          alert(res.errMsg);
        }
          
        break;
      default:
        console.warn(res)
        console.log(endpoint)
        break;
    }
  }
}

function getEndpoint(xhr) {
  var ep = xhr.responseURL.slice(PATH.length + 1);
  return ep.indexOf('/') === -1 
    ? ep 
    : ep.slice(0, ep.indexOf('/'))
}