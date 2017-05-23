import SocketServer from 'server/socketserver';
import Hub from 'server/hub';

const PORT = 3001;

var express = require('express');

export default class Server {

    constructor() {
        this.hub = new Hub;
        this.webserver = express();
        this.socketServer = new SocketServer(this.hub);
        this.setupWebserver();
    }

    setupWebserver() {
        this.webserver.use('/', express.static('build'));
        this.webserver.listen(PORT);
    }
}
