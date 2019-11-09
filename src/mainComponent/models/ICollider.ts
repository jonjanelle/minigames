import { I2DEntity } from "../../core/interfaces/I2DEntity";
import { Tile } from "./Tile";

export interface ICollider {
    collidesWith: (other: I2DEntity) => boolean;
    init: (tile: Tile) => void;
}