const HOST = "ws://"+window.location.hostname+":3002/";

export default class Server {

    constructor() {
        this.connected = false;
        this.websocket = new WebSocket(HOST);
        this.websocket.onopen = this.connectedToServer.bind(this);
        this.messageListeners = [];


        console.debug('Attempting to init server connection!');
    }

    connectedToServer(server) {

        this.server = server;
        this.connected = true;

        this.websocket.onmessage = (message) => {
            this.connected = true;
            this.notifyListeners(message, this.messageListeners);
        }
    }

    sendMessage(message) {
        if(!this.connected) return ;

        this.websocket.send(JSON.stringify(message));
    }

    addMessageListener = (fn) => {
        this.messageListeners.push(fn);
    }

    notifyListeners = (message, fns) => {
        let parsedMessage = JSON.parse(message.data);
        for (let fn of fns) {
           fn(parsedMessage);
        }

    }
}
