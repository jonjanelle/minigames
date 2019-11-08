import { ImageEntity } from "./ImageEntity";
import { I2DCoordinate } from "./interfaces/I2DCoordinate";

export abstract class SpriteAnimator {
    public nRows: number;
    public nCols: number;
    public spriteSheet: ImageEntity;
    public sWidth: number = 0;
    public sHeight: number = 0;


    constructor(imagePath: string, nRows: number, nCols: number, startCoordinate: I2DCoordinate) {
        this.nRows = nRows;
        this.nCols = nCols;
        this.spriteSheet = new ImageEntity({x: startCoordinate.x, y: startCoordinate.y}, imagePath);
    }
    
    public load() {
        let promise = new Promise((resolve, reject) => {
            this.spriteSheet.load().then(() => {
                this.sWidth = Math.floor(this.spriteSheet.image.width/this.nCols);
                this.sHeight = Math.floor(this.spriteSheet.image.height/this.nRows);
                resolve(true);
            }, () => {
                reject();
            });
        });
        
        return promise;
    }
}