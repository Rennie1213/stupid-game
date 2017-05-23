import Drawable from 'shared/components/drawable';

export default class DrawableSpritesheet extends Drawable {

    constructor(
        asset,
        frameWidth,
        frameHeight,
        columns,
        rows
    ) {
        super(asset);

        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.columns = columns;
        this.rows = rows;

        this.currentColumn = 1;
        this.currentRow = 2;
        this.type = "spritesheet";
    }
}
