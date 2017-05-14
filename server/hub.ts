import World from 'shared/world';
import Player from 'shared/entities/player';

export default class Hub {

    protected clients: Array<Client> = [];
    protected world: World = new World;

    constructor() {
        this.world.tick();
    }

    public addClient = (connection: any) => {
        let player = new Player(1);
        let client = new Client(connection, player);

        this.clients.push(client);
    }

    public removeClient = (connection: any) =>
        this.clients.splice(this.clients.indexOf(connection), 1);

}

class Client {
    public connection: any;
    public player: Player;

    constructor(connection: any, player: Player) {
        this.connection = connection;
        this.player = player;
    }
}
