import { Block } from "./Block";
import { Constants } from "./Constants";

export default class Puzzle {
    public blocks: Block[];
    constructor() {
        
        this.blocks = [new Block(), new Block(), new Block(),
                        new Block(), new Block(), new Block(),
                        new Block(), new Block(), new Block()];
    }


    // does not consider solvability, just looks for duplicates in a row, col, or Block
    public isValid(): boolean {
        
        this.blocks.forEach(b => {
            if (!b.isValid())
                return false;
        });

        return false;
    }

    public isSolved(): boolean {
        this.blocks.forEach(b => {
            if (!b.isSolved())
                return false;
        });

        if (!this.rowsAndColsAreSolved()) {
            return false
        }

        return true;
    }

    private rowsAndColsAreSolved(): boolean {
        for (let i = 0; i < 3; i++){
            let row = [];
            let col = [];
            for (let j = 0; j < 3; j++) {
                row.push(this.blocks[3*i + j].cells[3*i].value);
                row.push(this.blocks[3*i + j].cells[3*i+1].value);
                row.push(this.blocks[3*i + j].cells[3*i+2].value);
    
                col.push(this.blocks[3*j + i].cells[3*j].value);
                col.push(this.blocks[3*j + i].cells[3*j+1].value);
                col.push(this.blocks[3*j + i].cells[3*j+2].value);
            }

            if (!(this.isValidCollection(row, true) && this.isValidCollection(col, true))) {
                return false;
            }
        }

        return true;
    }

    private isValidCollection(values: number[], isSolved: boolean): boolean {
        if (isSolved)
            values = values.filter(v => v !== 0);

        if (values.length !== 9)
            return false;

        let entryCount: any = {};
        values.forEach(v => {
            if (entryCount[v] === undefined && (v in Constants.validValues)) {
                entryCount[v] = 1;
            } else {
                return false;
            }
        });

        return true;
    }

    //[a, b]
    private randInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    private emptyCount(): number {
        return this.blocks.map(b => b.cells.filter(c => c.value === 0).length).reduce((total, current) => current + total);
    }

    /*
    1 Randomly take any number 1-9 (one not tried before).
    2 Check if it is safe to put in the cell (row, column, and box).
    3 If safe: place it and increment to next location, then go to step 1.
    4 If not safe:  Maintain current position and go to step 1.
    5 Once matrix is fully filled, remove k no. of elements randomly to complete game.
    */
    public generate() {
        while (this.emptyCount() > 0) {

        }
     }

    
    public isSolvable(): boolean {
        //    #######
        //  ###########
        // ############# 
        // | ^^^   ^^^ |
        // | {0}   {0} |
        // |     V     |
        // |   _____   |
        //  \  \_U_/  / 
        //   \_______/
        return false;
    }
}