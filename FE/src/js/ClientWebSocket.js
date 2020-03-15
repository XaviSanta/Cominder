function connect() {
  connection = new WebSocket(SocketURL);
  
  connection.onopen = () => {
    console.log('Connection is open and ready to use');
    connected = true;
    connection.send(JSON.stringify({
      type: 'login', 
      data: {username, password:'123'}
    }));
  };

  connection.onmessage = (msg) => {
    var obj = JSON.parse(msg.data);
    switch (obj.type) {
      case 'LoginOK':
        console.log('LoginStatus: Success', obj );
        openApp();
        break;

      // TODO
      case 'LoginWRONG':
        alert('Wrong password' );
        break;

      case 'chat-message':
        if (obj.chatId === chatId) {
          appendMessage({author:obj.author, content:obj.content});
        }
        break;
      
      default:
        break;
    }
  };

  connection.onerror = (err) => {
    console.log('An error ocurred', err);
    connected = false;
  }; 
}
