import Entity from 'shared/entity';
import System from 'shared/system';
import AssetManager from 'client/assets';

import DrawableSpritesheet from 'shared/components/drawablespritesheet';

export default class Draw implements System{


    constructor(
        private context: CanvasRenderingContext2D,
        private assets: AssetManager
    ) {
        console.log('Init draw system');
    }

    appliesTo = (entity: Entity) =>
        entity.hasComponent("drawable");

    process = (entity: Entity, delta: number) => {

        let drawable = entity.getComponent("drawable");
        let asset = this.assets.getAsset(drawable.asset);

        if(!asset || !asset.loaded) return;

        let position = entity.getComponent('position');

        if (drawable.type === "spritesheet") {

            this.context.drawImage(
                asset.element,
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
        this.context.clearRect(0,0, 10000, 10000);
}
