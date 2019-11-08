import { I2DCoordinate } from "./I2DCoordinate";

export interface I2DEntity {
    position: I2DCoordinate;
    vX: number;
    vY: number;
    width: number;
    height: number;
    collidesWith: (other: I2DEntity) => boolean;
    update: (ctx: CanvasRenderingContext2D, gravity: number) => void;
}