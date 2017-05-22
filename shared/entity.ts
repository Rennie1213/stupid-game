export default abstract class Entity {

    public id: number;
    private components: any = {};

    abstract initialComponents() : any;

    public constructor(id: number) {
        this.id = id;

        this.components = this.initialComponents();
    }

    public addComponent = (name: string, component: any) =>
        this.components[name] = component;

    public getComponent = (name: string): any  =>
        this.components[name] || {};

    public removeComponent = (name: string) =>
        delete this.components[name];

    public hasComponent = (name: string): boolean =>
        name in this.components;
    
}
