const HOST: string = "ws://localhost:3002";

export default class Server {

    protected connected: boolean = false;
    protected websocket: any = new WebSocket(HOST);
    protected server: any;
    protected messageListeners: Array<any> = [];

    constructor() {
        this.websocket.onconnect = this.connectedToServer.bind(this);
    }

    public connectedToServer(server: any) {

        this.server = server;
        this.connected = true;

        this.server.onmessage = this.notifyListeners.bind(this);
    }

    public addMessageListener = (fn: any) => {
        this.messageListeners.push(fn);
    }

    private notifyListeners = (message: any, fns: Array<any>) => {
        console.debug('Notifying listeners', message);
        for (let fn of fns)
            fn(message);
    }
}
