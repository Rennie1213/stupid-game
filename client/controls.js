export default class Controls {

    constructor() {
        this.keys = {};
    }

    listen() {
        let listen = document.addEventListener;

        listen("keydown", this.keyDown, false);
        listen("keyup", this.keyUp, false);
    }

    keyDown = (event) =>
        this.keys[event.keyCode] = true;


    keyUp = (event) =>
        this.keys[event.keyCode] = false;

    isPressingUp = () =>
        (this.keys[38] || this.keys[87]);

    isPressingDown = () =>
        (this.keys[40] || this.keys[83]);

    isPressingLeft = () =>
        (this.keys[65] || this.keys[37]);

    isPressingRight = () =>
        (this.keys[68] || this.keys[39]);

}
