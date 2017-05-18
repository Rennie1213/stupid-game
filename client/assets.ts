export default class AssetManager {
    protected assets: any = {};

    public loadDefaults() {
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

    public addAsset(name: string, asset: Asset) {
        this.assets[name] = asset;
    }

    public getAsset(name: string) {
        return this.assets[name];
    }
}

interface Asset {
    loaded: boolean;
}

class ImageAsset implements Asset {
    public loaded: boolean = false;
    public source: string;
    public element: HTMLImageElement;

    constructor(source: string) {
        this.source = source;

        this.load();
    }

    public load() {
        if(!this.source) {
            console.warn('Loading image asset without source!!');
        }

        let source = require("../" + this.source);
        this.element = <HTMLImageElement> document.createElement('img');
        this.element.src = source;
        this.element.onload = this.onLoad.bind(this);
    }

    public onLoad() {
        this.loaded = true;
    }
}

class Spritesheet extends ImageAsset implements Asset {
    constructor(source: string) {
        super(source);
    }
}
