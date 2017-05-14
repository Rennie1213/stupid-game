import Hub from 'server/hub';

var WebSocket = require('ws');

export default class SocketServer {

    protected socketServer: any = new WebSocket.Server({
        perMessageDeflate: false,
        port: 3002
    });

    public constructor(private hub: Hub) {
        this.setListener();
    }

    public setListener = () =>
        this.socketServer.on('connection', this.connectionOpened);

    private connectionOpened = (connection: any) =>
        this.hub.addClient(connection);

    private messageReceived = (message: any) =>
        console.log(message);
        
    private connectionClosed = (connection: any) =>
        this.hub.removeClient(connection);
}
