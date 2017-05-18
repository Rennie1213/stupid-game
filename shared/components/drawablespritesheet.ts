import Drawable from 'shared/components/drawable';

export default class DrawableSpritesheet extends Drawable {
    public frameWidth: number;
    public frameHeight: number;
    public columns: number;
    public rows: number;

    public currentColumn: number;
    public currentRow: number;

    public type: string = "spritesheet";


    constructor(
        asset: string,
        frameWidth: number,
        frameHeight: number,
        columns: number,
        rows: number
    ) {
        super(asset);

        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.columns = columns;
        this.rows = rows;

        this.currentColumn = 1;
        this.currentRow = 2;
    }
}
