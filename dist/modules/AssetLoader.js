// @ts-nocheck
export class AssetLoader {
    constructor(toLoad = 0, loaded = 0) {
        this.toLoad = toLoad;
        this.loaded = loaded;
    }
    load(assets) {
        const imageExt = ['png'];
        const jsonExt = ['json'];
        this.toLoad = assets.length;
        return new Promise((resolve) => {
            assets.forEach((asset) => {
                const extension = asset.split('.').pop();
                if (imageExt.includes(extension)) {
                    this.loadImage(asset, resolve);
                }
                else if (jsonExt.includes(extension)) {
                    this.loadJson(asset, resolve);
                }
            });
        });
    }
    loadHandler(resolve) {
        this.loaded += 1;
        if (this.loaded === this.toLoad) {
            this.loaded = 0;
            this.toLoad = 0;
            resolve(this);
        }
    }
    loadImage(src, resolve) {
        const image = new Image();
        image.src = src;
        image.addEventListener('load', () => {
            this.loadHandler(resolve);
        }, false);
        const name = src.split('/').pop().split('.')[0];
        this[name] = image;
    }
    async loadJson(src, resolve) {
        try {
            const response = await fetch(src);
            const data = await response.json();
            this.loadHandler(resolve);
            const name = src.split('/').pop().split('.')[0];
            this[name] = data;
        }
        catch (error) { }
    }
}
