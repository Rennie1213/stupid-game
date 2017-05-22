import Entity from 'shared/entity';
import System from 'shared/system';
import AssetManager from 'client/assets';

import DrawableSpritesheet from 'shared/components/drawablespritesheet';

export default class DrawPlayer implements System{


    constructor(
        private context: CanvasRenderingContext2D,
        private assets: AssetManager
    ) {
        console.log('Init draw system');
    }

    appliesTo = (entity: Entity) =>
        entity.hasComponent("drawable") &&
        entity.getComponent("drawable").type == "spritesheet";

    process = (entity: Entity, delta: number) => {

        let drawable = entity.getComponent("drawable");
        let movement = entity.getComponent("movement");
        let asset = this.assets.getAsset(drawable.asset);

        console.debug(movement);
        drawable.currentRow = movement.direction;

        if(!asset || !asset.loaded) return;

        let position = entity.getComponent('position');

        this.context.drawImage(
            asset.element,
            drawable.frameWidth * drawable.currentColumn,
            drawable.frameHeight * drawable.currentRow,
            drawable.frameWidth,
            drawable.frameHeight,
            position.x,
            position.y,
            drawable.frameWidth,
            drawable.frameHeight,
        );

        // Draw all additional junk on top of it
        if(entity.hasComponent('accessoires')) {
            let accessoires = entity.getComponent('accessoires');

            for (let accessoire of accessoires) {
                let accessoireAsset = this.assets.getAsset(accessoire);

                this.context.drawImage(
                    accessoireAsset.element,

                    drawable.frameWidth * drawable.currentColumn,
                    drawable.frameHeight * drawable.currentRow,
                    drawable.frameWidth,
                    drawable.frameHeight,
                    position.x,
                    position.y,
                    drawable.frameWidth,
                    drawable.frameHeight,
                );
            }
        }
    }

    startTick = () =>
        this.clear();

    clear = () => 
        this.context.clearRect(0,0, 10000, 10000);
}
