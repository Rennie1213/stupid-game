export default class AssetManager {

    constructor() {
        this.assets = {};
    }

    loadDefaults() {
        this.addAsset('player', new Spritesheet(
            'client/assets/spritesheets/player.png'
        ));

        this.addAsset('accessoires.hair.1', new Spritesheet(
            'client/assets/spritesheets/accessoires/hair/1.png'
        ));

        this.addAsset('accessoires.facial-hair.1', new Spritesheet(
            'client/assets/spritesheets/accessoires/facial-hair/1.png'
        ));
        
        this.addAsset('accessoires.eyes.1', new Spritesheet(
            'client/assets/spritesheets/accessoires/eyes/1.png'
        ));

        this.addAsset('accessoires.expressions.angry', new Spritesheet(
            'client/assets/spritesheets/accessoires/expressions/angry.png'
        ));
    }

    addAsset(name, asset) {
        this.assets[name] = asset;
    }

    getAsset(name) {
        return this.assets[name];
    }
}

class ImageAsset {
    constructor(source) {
        this.source = source;
        this.loaded = false;

        this.load();
    }

    load() {
        if(!this.source) {
            console.warn('Loading image asset without source!!');
        }

        let source = require("../" + this.source);
        this.element = document.createElement('img');
        this.element.src = source;
        this.element.onload = this.onLoad.bind(this);
    }

    onLoad() {
        this.loaded = true;
    }
}

class Spritesheet extends ImageAsset {
    constructor(source) {
        super(source);
    }
}
