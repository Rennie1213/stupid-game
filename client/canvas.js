import CanvasDimensions from 'client/canvasDimensions';

export default class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
    }

    getRenderContext = () =>
        this.canvas.getContext("2d");

    updateDimensions = () =>
        this.setDimensions(this.getDimensions());


    getDimensions = () =>
        new CanvasDimensions(
            window.innerWidth, window.innerHeight
        );


    setDimensions(dimensions) {
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
    }
}

