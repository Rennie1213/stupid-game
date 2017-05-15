import Canvas from 'client/canvas'
import Server from 'client/server';
import Player from 'shared/entities/player';
import Draw from 'shared/systems/draw';
import ControlSystem from 'shared/systems/controls';
import World from 'shared/world';
import Network from 'shared/systems/network';
//import AssetLoader from 'shared/systems/asset';
import AssetManager from 'client/assets';

export default class Game {

    private canvas: Canvas = new Canvas(
        <HTMLCanvasElement> document.querySelector("canvas#game")
    );

    private context: CanvasRenderingContext2D =
        this.canvas.getRenderContext();

    private world: World = new World;
    private server: Server = new Server;
    private assets: AssetManager = new AssetManager;
    private drawSystem: Draw = new Draw(this.context, this.assets);

    constructor() {

        this.assets.loadDefaults();

        /**
         * Set sync listener
         */
        this.server.addMessageListener((message: any) => {
            if(message.type === "entity-update") {
                let newState = [];

                for (let entity of message.payload) {
                    let localEntity = this.world.findEntity(entity.id);

                    if(!localEntity) {
                        console.debug('Creating new entity');
                        localEntity = new Player(entity.id);
                    }

                    for (let component in entity.components) {
                        localEntity.addComponent(
                            component,
                            entity.components[component]
                        );
                    }

                    newState.push(localEntity);
                }

                this.world.replaceState(newState);
            }
        });

        this.canvas.updateDimensions();

        this.world.addSystem(this.drawSystem);
        this.world.addSystem(new Network(this.server));
        this.world.addSystem(new ControlSystem(this.server));
        //this.world.addSystem(new AssetLoader);

        this.world.tick();
    }
}
