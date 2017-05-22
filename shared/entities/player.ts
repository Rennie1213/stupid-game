import Entity from 'shared/entity';
import Positionable from 'shared/components/positionable';
import DrawableSpritesheet from 'shared/components/drawablespritesheet';
import Networked from 'shared/components/networked';
import Movement from 'shared/components/movement';
import Controls from 'shared/components/controls';

const PLAYER_SPEED = 0.8;

export default class Player extends Entity {

    public initialComponents() : any {
        return {
            'network' : new Networked,
            'movement': new Movement(PLAYER_SPEED),
            'controls': new Controls,
            'position':  new Positionable(
                0, 0
            ),
            'drawable': new DrawableSpritesheet(
                "player",
                96,
                141,
                3,
                4
            ),
            'accessoires': [
                'accessoires.facial-hair.1',
                'accessoires.hair.1',
                'accessoires.eyes.1',
                'accessoires.expressions.angry'
            ],
        };
    }


}
