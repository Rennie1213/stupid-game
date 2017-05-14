import CanvasDimensions from 'client/canvasDimensions';

export default class Canvas {

    public constructor(private canvas: HTMLCanvasElement) {}

    public getRenderContext = (): CanvasRenderingContext2D =>
        this.canvas.getContext("2d");

    public updateDimensions = () =>
        this.setDimensions(this.getDimensions());


    private getDimensions = (): CanvasDimensions =>
        new CanvasDimensions(
            window.innerWidth, window.innerHeight
        );


    private setDimensions(dimensions: CanvasDimensions) {
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
    }
}

