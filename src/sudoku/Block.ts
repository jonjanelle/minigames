import { Cell } from "./Cell";

const validValues: number[] = [1,2,3,4,5,6,7,8,9];

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

    public isValid(): boolean {
        //should be able store this elsewhere and update when move is made.
        let entryCount: any = {};
        
        this.cells.filter(c => c.value !== 0).forEach(c => {
            if (entryCount[c.value] === undefined && (c.value in validValues)) {
                entryCount[c.value] = 1;
            } else {
                return false;
            }
        });

        return true;
    }


    public isSolved(): boolean {
        let seen: number[] = [];

        this.cells.forEach(c => {
            if (c.value == 0 || !(c.value in validValues) || c.value in seen)
                return false;

            seen.push(c.value);
        });

        return true;
    }
}