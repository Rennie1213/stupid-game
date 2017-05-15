import Entity from 'shared/entity';
import System from 'shared/system';

export default class AssetLoader implements System{

    appliesTo = (entity: Entity) =>
        entity.hasComponent("drawable");

    process = (entity: Entity, delta: number) => {
        let drawable = entity.getComponent('drawable');

        if(!drawable.isLoading) {
            drawable.isLoading = true;

            let element: HTMLImageElement =
                <HTMLImageElement> document.createElement('img')

            element.onload = () => {
                drawable.loaded = true;
            }

            element.src = drawable.imageData;

            drawable.element = element;
        }
    }

    startTick = () => {}

    clear = () =>  {}
}
