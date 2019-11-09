import { Tile } from './Tile';
import { I2DEntity } from '../../core/interfaces/I2DEntity';
import { ICollider } from './ICollider';
import { isUndefined } from 'util';

export class BoxCollider implements ICollider {
    private _tile: Tile | undefined;
    private tileLeft: number = 0;
    private tileRight: number = 0;
    private tileTop: number = 0;
    private tileBottom: number = 0;
    
    constructor() { }
    
    public init(tile: Tile) {
        this._tile = tile;
        this.tileLeft = this._tile.position.x;
        this.tileRight = this._tile.position.x + this._tile.width;
        this.tileTop = this._tile.position.y;
        this.tileBottom = this._tile.position.y + this._tile.height;
    }

    public collidesWith(other: I2DEntity): boolean {
        if (isUndefined(this._tile)) { return false; }

        let otherLeft = other.position.x;
        let otherRight = other.position.x + other.width;
        let otherTop = other.position.y;
        let otherBottom = other.position.y + other.height;

        if ((this.tileBottom < otherTop) || (this.tileTop > otherBottom) || 
            (this.tileRight < otherLeft) || (this.tileLeft > otherRight)) 
        {
            return false;
        }

        return true;
    }
}