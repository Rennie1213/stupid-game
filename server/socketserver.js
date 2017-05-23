import Hub from 'server/hub';

var WebSocket = require('ws');

export default class SocketServer {

    constructor(hub) {
        this.socketServer = new WebSocket.Server({
            perMessageDeflate: false,
            port: 3002
        });
        this.hub = hub;

        this.setListener();
    }

    setListener = () =>
        this.socketServer.on('connection', this.connectionOpened);

    connectionOpened = (connection) =>
        this.hub.addClient(connection);

    messageReceived = (message) =>
        console.log(message);
        
    connectionClosed = (connection) =>
        this.hub.removeClient(connection);
}
