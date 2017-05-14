import Canvas from 'client/canvas'
import Server from 'client/server';
import Player from 'shared/entities/player';
import Draw from 'shared/systems/draw';
import Movement from 'shared/systems/movement';
import World from 'shared/world';
import Network from 'shared/systems/network';

export default class Game {

    private canvas: Canvas = new Canvas(
        <HTMLCanvasElement> document.querySelector("canvas#game")
    );

    private context: CanvasRenderingContext2D =
        this.canvas.getRenderContext();

    private world: World = new World;
    private player: Player = new Player(1);
    private drawSystem: Draw = new Draw(this.context);
    private server: Server = new Server;

    constructor() {

        this.canvas.updateDimensions();

        this.world.addEntity(this.player);
        this.world.addSystem(this.drawSystem);
        this.world.addSystem(new Movement);
        this.world.addSystem(new Network(this.server));

        this.world.tick();
    }

}
