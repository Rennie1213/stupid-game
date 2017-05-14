import Entity from 'shared/entity';
import System from 'shared/system';

import DrawableSpritesheet from 'shared/components/drawablespritesheet';

export default class Draw implements System{

    constructor(private context: CanvasRenderingContext2D) {}

    appliesTo = (entity: Entity) =>
        entity.hasComponent("drawable");

    process = (entity: Entity, delta: number) => {

        let position = entity.getComponent('position');
        let drawable = entity.getComponent("drawable");

        if (drawable instanceof DrawableSpritesheet) {
            drawable.init();

            this.context.drawImage(
                drawable.element,
                0,
                0,
                drawable.frameWidth,
                drawable.frameHeight,
                position.x,
                position.y,
                drawable.frameWidth,
                drawable.frameHeight,
            );
        }
    }

    startTick = () =>
        this.clear();

    clear = () => 
        this.context.clearRect(0,0, 100000, 100000);
}
