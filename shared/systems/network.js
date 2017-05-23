import Entity from 'shared/entity';
import Server from 'client/server';

export default class Network {

    constructor(server) {
        this.messageBuffer = [];

        this.server = server;
        
        this.server.addMessageListener(
            this.handleMessage.bind(this)
        );
    }

    startTick = () => {}

    appliesTo = (entity) => 
        entity.hasComponent("network");

    process = (entity) => {
        for (let message of this.messageBuffer) {

        }
    }

    handleMessage = (event) =>
        this.messageBuffer.push(event);
}
