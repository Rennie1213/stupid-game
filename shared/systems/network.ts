import System from 'shared/system';
import Entity from 'shared/entity';
import Server from 'client/server';

export default class Network implements System {

    private messageBuffer: Array<any> = [];

    constructor(private server: Server) {
        
        this.server.addMessageListener(
            this.handleMessage.bind(this)
        );
    }

    startTick = () => {}

    appliesTo = (entity: Entity) : boolean => 
        entity.hasComponent("network");

    process = (entity: Entity) => {
        for (let message of this.messageBuffer) {

        }
    }

    handleMessage = (event: Event) =>
        this.messageBuffer.push(event);
}
