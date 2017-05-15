import Message from 'shared/message';

export default class Movement implements Message {
    public type: string = "movement";
    public payload: any;

    public constructor(payload: any) {
        this.payload = payload;
    }
}
