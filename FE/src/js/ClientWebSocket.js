function connect() {
  connection = new WebSocket(SocketURL);
  
  connection.onopen = () => {
    console.log('Connection is open and ready to use');
  };

  connection.onmessage = (msg) => {
    var obj = JSON.parse(msg.data);
    console.log(msg.data)

    switch (obj.type) {
      case 'LoginOK':
        console.log('LoginStatus: Success', obj );
        openApp();
        break;

      // TODO
      case 'LoginWRONG':
        alert('Wrong password' );

      default:
        break;
    }
  };
}
