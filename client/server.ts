import Message from 'shared/message';

const HOST: string = "ws://"+window.location.hostname+":3002/";

export default class Server {

    protected connected: boolean = false;
    protected websocket: any = new WebSocket(HOST);
    protected server: any;
    protected messageListeners: Array<any> = [];

    constructor() {
        console.debug('Attempting to init server connection!');
        this.websocket.onopen = this.connectedToServer.bind(this);
    }

    public connectedToServer(server: any) {

        console.debug('Connected to server');

        this.server = server;
        this.connected = true;

        this.websocket.onmessage = (message: any) => {
            this.connected = true;
            this.notifyListeners(message, this.messageListeners);
        }
    }

    public sendMessage(message: Message) {
        if(!this.connected) return ;

        this.websocket.send(JSON.stringify(message));
    }

    public addMessageListener = (fn: Function) => {
        this.messageListeners.push(fn);
    }

    private notifyListeners = (message: any, fns: Array<(message: any) => void>) => {

        let parsedMessage = JSON.parse(message.data);
        for (let fn of fns) {
           fn(parsedMessage);
        }

    }
}
