import { I2DCoordinate } from "./interfaces/I2DCoordinate";

export class Text {
    public size: string;
    public font: string;
    public color: string;
    public position: I2DCoordinate;
    public text: string;

    constructor(size: string, font: string, color: string, position: I2DCoordinate, text: string) {
        this.size = size;
        this.font = font;
        this.color = color;
        this.position = position;
        this.text = text;
    }

    public update(ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.size} ${this.font}`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.position.x, this.position.y);
    }
}