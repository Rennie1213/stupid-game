const TICK_INTERVAL = 50;
const IS_BROWSER = typeof window !== 'undefined';

export default class World {

    constructor() {
        this.entities = [];
        this.systems = [];
        this.entityCounter = 0;
        this.lastTick = new Date;
    }

    addEntity = (entity) => {
        entity.id = ++this.entityCounter;
        this.entities.push(entity);
    }

    addSystem = (system) =>
        this.systems.push(system);

    findEntity = (id) =>
        this.entities.find((entity) => entity.id == id)

    removeEntity = (entity) =>
        this.entities.splice(this.entities.indexOf(entity), 1)

    setTickTimer = () =>
        this.tickTimer = setInterval(
            this.tick.bind(this),
            TICK_INTERVAL
        );

    replaceState = (entities) =>
        this.entities = entities;

    snapshotState = () =>
        this.entities;

    tick() {

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
