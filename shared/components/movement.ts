export default class Movement {
    direction: number = 0;
    moving: boolean = false;
    speed: number = 0.1;

    constructor(speed: number) {
        this.speed = speed;
    }
}
