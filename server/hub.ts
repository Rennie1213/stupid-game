import World from 'shared/world';
import Player from 'shared/entities/player';
import EntityUpdate from 'shared/messages/entityupdate';
import Message from 'shared/message';

export default class Hub {

    protected clients: Array<Client> = [];
    protected world: World = new World;

    constructor() {
        this.world.tick();

        setInterval(this.syncGameState.bind(this), 50);
    }

    public addClient = (connection: any) => {
        console.log("adding new player to hub");

        let player = new Player(1);
        let client = new Client(connection, player);

        this.clients.push(client);

        this.world.addEntity(client.player);

        // on close
        client.connection.onclose = () => {
            this.removeClient(client);
        }

        client.connection.onmessage = (message: any) => {
            this.handleMessage(client, message);
        };
    }

    public removeClient = (client: Client) => {
        console.log("removing player from hub");
        this.clients.splice(this.clients.indexOf(client), 1);
    }

    public handleMessage(client: Client, message: any) {
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
    public syncGameState() {
        for (let client of this.clients) {
            let entityMessage = new EntityUpdate(this.world.entities);
            client.sendMessage(entityMessage);
        }
    }
}

class Client {
    public connection: any;
    public player: Player;

    constructor(connection: any, player: Player) {
        this.connection = connection;
        this.player = player;
    }

    public sendMessage(message: Message) {
        this.connection.send(JSON.stringify(message));
    }
}
