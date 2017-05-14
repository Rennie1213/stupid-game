import Entity from 'shared/entity';
import Positionable from 'shared/components/positionable';
import DrawableSpritesheet from 'shared/components/drawablespritesheet';
import Networked from 'shared/components/networked';


export default class Player extends Entity {

    public constructor(id: number)  {
        super();

        this.id = id;

        this.addComponent('position', new Positionable(50, 50));
        this.addComponent('network', new Networked);

        this.addComponent('drawable', new DrawableSpritesheet(
            require('client/assets/spritesheets/death.png'),
            32,
            48,
            4,
            4
        ));


    }

    moveDown() {}
    moveUp() {}
}
