import Controls from 'client/controls';
import System from 'shared/system';
import Entity from 'shared/entity';
import Player from 'shared/entities/player';

const MOVEMENT_SPEED = 0.3;

export default class Movement implements System {

    private controls: Controls = new Controls;

    constructor() {
        this.controls.listen();
    }

    appliesTo = (entity: Entity) => 
        entity instanceof Player;

    startTick = () =>
        {}

    process = (entity: Entity, delta: number) => {
        let position = entity.getComponent("position");

        if (this.controls.isPressingUp())
            position.y -= MOVEMENT_SPEED * delta;

        if (this.controls.isPressingDown())
            position.y += MOVEMENT_SPEED * delta;

        if (this.controls.isPressingLeft())
            position.x -= MOVEMENT_SPEED * delta;

        if (this.controls.isPressingRight())
            position.x += MOVEMENT_SPEED * delta;
    }
}
