import Entity from 'shared/entity';

interface System {
    appliesTo(entity: Entity): boolean;
    process(entity: Entity, delta: number): void;
    startTick(): void;
}

export default System;
