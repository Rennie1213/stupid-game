export default class Entity {

    constructor(id) {
        this.id = id;
        this.components = this.initialComponents();
    }

    addComponent = (name, component) =>
        this.components[name] = component;

    getComponent = (name) =>
        this.components[name] || {};

    removeComponent = (name) =>
        delete this.components[name];

    hasComponent = (name) =>
        name in this.components;
}
