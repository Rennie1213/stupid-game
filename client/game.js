import Canvas from 'client/canvas'
import Server from 'client/server';
import Player from 'shared/entities/player';
import DrawPlayer from 'shared/systems/drawplayer';
import ControlSystem from 'client/systems/controls';
import World from 'shared/world';
import Network from 'shared/systems/network';
import AssetManager from 'client/assets';

export default class Game {
    
    constructor() {

        this.canvas = new Canvas(
            document.querySelector("canvas#game")
        );

        this.context = this.canvas.getRenderContext();

        this.world = new World;
        this.server = new Server;
        this.assets = new AssetManager;

        this.assets.loadDefaults();

        console.debug('Please kill me');

        /**
         * Set sync listener
         */
        this.server.addMessageListener((message) => {
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

        this.world.addSystem(new DrawPlayer(this.context, this.assets));
        this.world.addSystem(new Network(this.server));
        this.world.addSystem(new ControlSystem(this.server));
        //this.world.addSystem(new AssetLoader);

        this.world.tick();
    }
}
