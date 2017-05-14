export default class Controls {
    public keys: any = {};

    public listen() {
        let listen = document.addEventListener;

        listen("keydown", this.keyDown, false);
        listen("keyup", this.keyUp, false);
    }

    private keyDown = (event: KeyboardEvent) =>
        this.keys[event.keyCode] = true;


    private keyUp = (event: KeyboardEvent) =>
        this.keys[event.keyCode] = false;

    public isPressingUp = () : boolean =>
        (this.keys[38] || this.keys[87]);

    public isPressingDown = () : boolean =>
        (this.keys[40] || this.keys[83]);

    public isPressingLeft = () : boolean =>
        (this.keys[65] || this.keys[37]);

    public isPressingRight = () : boolean =>
        (this.keys[68] || this.keys[39]);

}
