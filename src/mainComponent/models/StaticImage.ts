import { I2DCoordinate } from "../../core/interfaces/I2DCoordinate";

export class StaticImage {
    public image: HTMLImageElement;
    public isLoaded: boolean = false;
    public position: I2DCoordinate;

    constructor(filePath: string, position: I2DCoordinate) {
        this.image = new Image();
        this.image.src = filePath;
        this.image.onload = () => this.isLoaded = true;
        this.position = position;
    }

    update(ctx: CanvasRenderingContext2D): void {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }
}
