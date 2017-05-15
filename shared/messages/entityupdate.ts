import Message from 'shared/message';

export default class EntityUpdate implements Message {
    public type: string = "entity-update";
    public payload: any;

    public constructor(payload: any) {
        this.payload = payload;
    }
}
