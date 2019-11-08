import { I2DCoordinate } from "./interfaces/I2DCoordinate";
import { I2DEntity } from "./interfaces/I2DEntity";

export class BlockEntity implements I2DEntity {
    public position: I2DCoordinate;
    public vY: number;
    public vX: number;
    public width: number;
    public height: number;
    public color: string;

    constructor(width: number, height: number, color: string, position: I2DCoordinate) {
        this.position = position;
        this.vY = 0;
        this.vX = 0;
        this.width = width;
        this.height = height;
        this.color = color;
    }   

    public update(ctx: CanvasRenderingContext2D, gravity: number): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.vY += gravity;
        this.position.x += this.vX;
        this.position.y += this.vY;
        this.checkAreaBoundaries(ctx.canvas);
    }


    public checkAreaBoundaries(canvas: HTMLCanvasElement) {
        this.checkBottom(canvas.height);
        this.checkTop();
        this.checkLeft();
        this.checkRight(canvas.width);
    }

    private checkBottom(canvasHeight: number): boolean {
        let bottom = canvasHeight - this.height;
        if (this.position.y > bottom) {
            this.position.y = bottom;
            this.vY = 0;
            return true;
        }

        return false;
    }

    private checkTop(): boolean {
        if (this.position.y < 0) {
            this.position.y = 0;
            this.vY = 0;
            return true;
        }

        return false;
    }

    private checkLeft(): boolean {
        if (this.position.x < 0) {
            this.position.x = 0;
            this.vX = 0;
            return true;
        }

        return false;
    }

    private checkRight(canvasWidth: number): boolean {
        let right = canvasWidth - this.width;
        if (this.position.x > right) {
            this.position.x = right;
            this.vX = 0;
            return true;
        }

        return false;
    }

    private collidesWithTop(other: I2DEntity) {
        let mybottom = this.position.y + this.height;
        let myleft = this.position.x;
        let myright = this.position.x + this.width;
        let otherleft = other.position.x;
        let otherright = other.position.x + other.width;
        let othertop = other.position.y;
        let otherbottom = other.position.y + other.height;

        if (mybottom) {

        }
    }
    
    public collidesWith(other: I2DEntity): boolean {
        let collision = true;

        let myleft = this.position.x;
        let myright = this.position.x + this.width;
        let mytop = this.position.y;
        let mybottom = this.position.y + this.height;
        let otherleft = other.position.x;
        let otherright = other.position.x + other.width;
        let othertop = other.position.y;
        let otherbottom = other.position.y + other.height;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            collision = false;
        }

        return collision;
    }

}