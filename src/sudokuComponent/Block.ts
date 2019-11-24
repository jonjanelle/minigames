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
        console.log(this.cells)
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
            if (entryCount[c.value] === 0 && this.isValidValue(c.value)) {
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
            if (c.value == 0 || !this.isValidValue(c.value) || seen.findIndex(s => s === c.value) >= 0)
                return false;

            seen.push(c.value);
        });

        return true;
    }

    private isValidValue(value: number): boolean {
        return (Constants.validValues.findIndex(vv => vv === value) >= 0);
    }
}