import World from 'shared/world';
import Player from 'shared/entities/player';
import EntityUpdate from 'shared/messages/entityupdate';
import Movement from 'shared/systems/movement';
var WebSocket = require('ws');

export default class Hub {

    constructor() {
        this.clients = [];
        this.world = new World;
        this.world.addSystem(new Movement);
        this.world.tick();

        setInterval(this.syncGameState.bind(this), 50);
    }

    addClient = (connection) => {

        let player = new Player(1);
        let client = new Client(connection, player);

        this.clients.push(client);

        this.world.addEntity(client.player);

        // on close
        client.connection.onclose = () => {
            this.removeClient(client);
        }

        client.connection.onmessage = (message) => {
            this.handleMessage(client, message);
        };
    }

    removeClient = (client) => {
        this.clients.splice(this.clients.indexOf(client), 1);

        this.world.removeEntity(client.player);
    }

    handleMessage(client, message) {
        let parsedMessage = JSON.parse(message.data);

        switch(parsedMessage.type) {

            case "movement":
                let controlState = parsedMessage.payload;
                let controls = client.player.getComponent("controls");

                controls.up = controlState.moving_up;
                controls.down = controlState.moving_down;
                controls.left = controlState.moving_left;
                controls.right = controlState.moving_right;
            break;
        }
    }


    // Syncs the current entitie list with all clients
    syncGameState() {
        for (let client of this.clients) {


            let entityMessage = new EntityUpdate(this.world.entities);
            client.sendMessage(entityMessage);
        }
    }
}

class Client {
    constructor(connection, player) {
        this.connection = connection;
        this.player = player;
    }

    sendMessage(message) {
        if (this.connection.readyState !== WebSocket.OPEN)  {
            return ;
        }

        this.connection.send(JSON.stringify(message));
    }
}
