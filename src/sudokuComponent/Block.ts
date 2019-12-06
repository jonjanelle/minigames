import { Cell } from "./Cell";
import { Constants } from "./Constants";


export class Block {
    public cells: Cell[];  
    public isSelected: boolean;

    constructor() {
        this.cells = [new Cell(0),new Cell(0),new Cell(0),
                       new Cell(0),new Cell(0),new Cell(0),
                       new Cell(0),new Cell(0),new Cell(0)];
        this.isSelected = false;
    }

    public select(): void {
        this.isSelected = true;
    }

    public unSelect(): void {
        this.isSelected = false;
    }
}