import { I2DCoordinate } from "../core/interfaces/I2DCoordinate";
import { I2DEntity } from "../core/interfaces/I2DEntity";

export class AnimatedSpriteEntity implements I2DEntity {
    public image: HTMLImageElement;
    public isLoaded: boolean = false;
    public vX: number = 0;
    public vY: number = 0;
    public position: I2DCoordinate;

    // size of each cell in spritesheet
    public width: number = 0;
    public height: number = 0;

    // number of rows and cols in spritesheet
    private nCols: number;
    private nRows: number;

    // current position in spritesheet grid
    private cellX: number = 0;
    private cellY: number = 0;

    private filePath: string;

    private animationSpeed: number;
    private animationCounter: number;

    constructor(filePath: string, nRows: number, nCols: number, startCoordinate: I2DCoordinate, animationSpeed: number = 1) {
        this.nRows = nRows;
        this.nCols = nCols;
        this.position = startCoordinate;
        this.filePath = filePath;
        this.image = new Image();
        this.animationSpeed = animationSpeed;
        this.animationCounter = 1;
    }

    public load(): void {
        this.image.src = this.filePath;

        this.image.onload = () => { 
            this.width = Math.floor(this.image.width/this.nCols);
            this.height = Math.floor(this.image.height/this.nRows);
            this.isLoaded = true;
        }
    }

    public update(ctx: CanvasRenderingContext2D, gravity: number): void {
        if (this.isLoaded) {

            ctx.drawImage(this.image, 
                        this.width*this.cellX, this.height*this.cellY, //top left corner of the sub-rectangle
                        this.width, this.height, // dimension of sub-rectangle 
                        this.position.x, this.position.y, //coordinate in the destination canvas at which to place the top-left corner 
                        this.width, this.height);
            if (this.animationCounter % this.animationSpeed === 0) {
                this.animationCounter = 1;
                this.cellX += 1;
                if (this.cellX === this.nCols) {
                    this.cellX = 0;
                    this.cellY += 1;
                    if (this.cellY === this.nRows) {
                        this.cellY = 0;
                    }
                }
            }
            this.animationCounter += 1;
        }
    }

    public collidesWith(other: I2DEntity): boolean {
        let myLeft = this.position.x;
        let myRight = this.position.x + this.width;
        let myTop = this.position.y;
        let myBottom = this.position.y + this.height;
        let otherLeft = other.position.x;
        let otherRight = other.position.x + other.width;
        let otherTop = other.position.y;
        let otherBottom = other.position.y + other.height;

        if ((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)) {
            return false;
        }

        return true;
    }
}