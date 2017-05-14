export default class DrawableSpritesheet {
    public frameWidth: number;
    public frameHeight: number;
    public columns: number;
    public rows: number;

    public currentColumn: number;
    public currentRow: number;

    public imageData: string;
    public element: any;

    constructor(
        imageData: string,
        frameWidth: number,
        frameHeight: number,
        columns: number,
        rows: number
    ) {
        this.imageData = imageData;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.columns = columns;
        this.rows = rows;
    }

    init() {
        if(this.element == undefined) {
            this.element = document.createElement('img');
            this.element.src = this.imageData;
        }
    }
}
