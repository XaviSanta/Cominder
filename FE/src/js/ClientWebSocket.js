var connection = null;

function connect() {
  connection = new WebSocket('ws://127.0.0.1:9035');

  connection.onopen = () => {
    console.log('Connection is open and ready to use');
  };

  connection.onmessage = (msg) => {
    var obj = JSON.parse(msg.data);
    console.log(msg.data)

    switch (obj.type) {
      case 'LoginOK':
        console.log('LoginStatus: Success', obj );
        getInitInfo();
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
