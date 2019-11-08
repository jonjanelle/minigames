import { I2DCoordinate } from "./interfaces/I2DCoordinate";
import { I2DEntity } from "./interfaces/I2DEntity";

export class ImageEntity implements I2DEntity {
    public isLoaded: boolean = false;
    public vX: number;
    public vY: number;
    public position: I2DCoordinate;
    public width: number;
    public height: number;

    public image: HTMLImageElement;
    private imagePath: string;


    constructor(position: I2DCoordinate, imagePath: string) {
        this.isLoaded = false;
        this.image = new Image();
        this.imagePath = imagePath;
        this.position = position;
        this.width = 48;
        this.height = 48;
        this.vX = 0;
        this.vY = 0;
    }

    public load(): Promise<boolean> {
        this.image.src = this.imagePath;
        this.image.onload = () => { this.isLoaded = true; }

        let promise = new Promise<boolean>((resolve, reject) => {
            let n = 1;
            let interval = setInterval(() => {
                if (!this.isLoaded) {
                    if (n === 10) {
                        clearInterval(interval);
                        reject(false);
                    }
                    n += 1;
                } else {
                    resolve(true);
                    clearInterval(interval);
                }
            }, 100);
        });

        return promise;
    }


    public update(ctx: CanvasRenderingContext2D, gravity: number): void {
        ctx.drawImage(this.image, 100, 100, 48, 48);
        this.vY += gravity;
        this.position.x += this.vX;
        this.position.y += this.vY;
    }

    public collidesWith(other: I2DEntity): boolean {
        let collision = true;

        let myleft = this.position.x;
        let myright = this.position.x + (this.width);
        let mytop = this.position.y;
        let mybottom = this.position.y + (this.height);
        let otherleft = other.position.x;
        let otherright = other.position.x + (other.width);
        let othertop = other.position.y;
        let otherbottom = other.position.y + (other.height);
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            collision = false;
        }

        return collision;
    }
}