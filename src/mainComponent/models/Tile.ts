import { I2DCoordinate } from "../../core/interfaces/I2DCoordinate";
import { ICollider } from "./ICollider";
import { I2DEntity } from "../../core/interfaces/I2DEntity";
import { isNullOrUndefined, isUndefined } from "util";

export class Tile {
    public image: HTMLImageElement;
    public isLoaded: boolean = false;
    public position: I2DCoordinate;
    public width: number = 0;
    public height: number = 0;


    public collider: ICollider | undefined;

    constructor(filePath: string, position: I2DCoordinate, collider?: ICollider) {
        this.image = new Image();
        this.image.src = filePath;
        this.position = position;
        this.collider = collider;
        
        this.image.onload = () => {
            this.isLoaded = true;
            this.width = this.image.width;
            this.height = this.image.height;
            if (!isUndefined(this.collider)) {
                this.collider.init(this)
            }
        };
    }

    public update(ctx: CanvasRenderingContext2D): void {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }

    public collidesWith(other: I2DEntity): boolean {
        if (isUndefined(this.collider)) {
            return false;
        }

        return this.collider.collidesWith(other);
    }


}
