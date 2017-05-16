import Entity from 'shared/entity';
import Positionable from 'shared/components/positionable';
import DrawableSpritesheet from 'shared/components/drawablespritesheet';
import Networked from 'shared/components/networked';
import Movement from 'shared/components/movement';
import Controls from 'shared/components/controls';

const PLAYER_SPEED = 0.8;

export default class Player extends Entity {

    public constructor(id: number)  {
        super();

        this.id = id;

        this.addComponent('position', new Positionable(
            Math.random() * 100,
            Math.random() * 100
        ));
        this.addComponent('network', new Networked);
        this.addComponent('movement', new Movement(PLAYER_SPEED));
        this.addComponent('controls', new Controls);

        this.addComponent('drawable', new DrawableSpritesheet(
            "player",
            72,
            96,
            3,
            4
        ));

    }
}
