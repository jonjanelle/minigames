import { I2DCoordinate } from "../core/interfaces/I2DCoordinate";
import { I2DEntity } from "../core/interfaces/I2DEntity";

export class SpriteEntity implements I2DEntity {
    private filePath: string;
    
    public image: HTMLImageElement;
    public isLoaded: boolean = false;
    public position: I2DCoordinate;
    public speed: number;
    public width: number = 0;
    public height: number = 0;
    public vX: number = 0;
    public vY: number = 0;
    
    constructor(filePath: string, startPosition: I2DCoordinate, speed: number) {
        this.filePath = filePath;
        this.image = new Image();
        this.speed = speed;
        this.position = startPosition;
    }

    public load(): void {
        this.image.src = this.filePath;
        this.image.onload = () => { 
            this.isLoaded = true;
            this.width = this.image.width;
            this.height = this.image.height;
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

    public update(ctx: CanvasRenderingContext2D, gravity: number): void {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
            this.vY += gravity;
            this.position.x += this.vX;
            this.position.y += this.vY;
        }
    }
}