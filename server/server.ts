import SocketServer from 'server/socketserver';
import Hub from 'server/hub';

const PORT = 3001;

var express = require('express');

export default class Server {

    protected hub: Hub = new Hub;

    protected webserver: any = express();
    protected socketServer: SocketServer = new SocketServer(this.hub);

    constructor() {
        this.setupWebserver();
    }

    private setupWebserver() {
        this.webserver.use('/', express.static('build'));
        this.webserver.listen(PORT);
    }
}
