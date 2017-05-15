import Controls from 'client/controls';
import System from 'shared/system';
import Entity from 'shared/entity';
import Player from 'shared/entities/player';
import Movement from 'shared/messages/movement';
import Server from 'client/server';

const MOVEMENT_SPEED = 0.3;

export default class ControlSystem implements System {

    private controls: Controls = new Controls;
    private server: Server;

    constructor(server: Server) {
        this.controls.listen();
        this.server = server;
    }

    appliesTo = (entity: Entity) => 
        entity instanceof Player;

    startTick = () =>
        {}

    process = (entity: Entity, delta: number) => {
        let position = entity.getComponent("position");
        let movement = entity.getComponent("movement");

        let payload = {
            moving_up: false,
            moving_down: false,
            moving_left: false,
            moving_right: false
        };

        if (this.controls.isPressingUp())
            payload.moving_up = true;

        if (this.controls.isPressingDown())
            payload.moving_down = true;

        if (this.controls.isPressingLeft())
            payload.moving_left = true;

        if (this.controls.isPressingRight())
            payload.moving_right = true;

        this.server.sendMessage(new Movement(payload));
    }
}
