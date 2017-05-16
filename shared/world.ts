import Entity from 'shared/entity';
import System from 'shared/system';

const TICK_INTERVAL = 50;
const IS_BROWSER = typeof window !== 'undefined';

export default class World {

    public entities: Array<any> = [];
    public systems: Array<System> = [];
    public entityCounter = 0;

    public tickTimer: any;
    private lastTick: Date = new Date;

    public addEntity = (entity: Entity) => {
        entity.id = ++this.entityCounter;
        this.entities.push(entity);
    }

    public addSystem = (system: System) =>
        this.systems.push(system);

    public findEntity = (id: number) : Entity =>
        this.entities.find((entity: Entity) => entity.id == id)

    public removeEntity = (entity: Entity) =>
        this.entities.splice(this.entities.indexOf(entity), 1)

    private setTickTimer = () =>
        this.tickTimer = setInterval(
            this.tick.bind(this),
            TICK_INTERVAL
        );

    public replaceState = (entities: Array<any>) =>
        this.entities = entities;

    public snapshotState = () : Array<any> =>
        this.entities;

    tick(): void {

        let delta = new Date().valueOf() - this.lastTick.valueOf();
        this.lastTick = new Date();

        //this.drawSystem.clear();
        for (let system of this.systems) {
            system.startTick();
        }

        for (let system of this.systems) {

            for (let entity of this.entities) {

                if (system.appliesTo(entity)) {
                    system.process(entity, delta);
                }
            }
        }

        if(IS_BROWSER) {
            window.requestAnimationFrame(this.tick.bind(this));
        } else if(!this.tickTimer) {
            console.log('Running server, setting ticktimer');
            this.setTickTimer();
        }
    }

}
