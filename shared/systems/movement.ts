import System from 'shared/system';
import Entity from 'shared/entity';
import Player from 'shared/entities/player';

const MOVEMENT_SPEED = 0.3;

export default class Movement implements System {

    appliesTo = (entity: Entity) => 
        entity instanceof Player;

    startTick = () =>
        {}

    process = (entity: Entity, delta: number) => {
        let moving = false;
        let position = entity.getComponent("position");
        let controls = entity.getComponent("controls");
        let movement = entity.getComponent("movement");

        if (controls.up) {
            position.y -= MOVEMENT_SPEED * delta;
            moving = true;
            movement.direction = 0;
        }

        if (controls.down) {
            position.y += MOVEMENT_SPEED * delta;
            moving = true;
            movement.direction = 2;
        }

        if (controls.left) {
            position.x -= MOVEMENT_SPEED * delta;
            moving = true;
            movement.direction = 1;
        }

        if (controls.right) {
            position.x += MOVEMENT_SPEED * delta;
            moving = true;
            movement.direction = 3;
        }

        movement.moving = moving;
    }
}
