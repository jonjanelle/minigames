import { Block } from "./Block";
const validValues: number[] = [1,2,3,4,5,6,7,8,9];

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
                row.push(this.blocks[3*i + j].values[3*i]);
                row.push(this.blocks[3*i + j].values[3*i+1]);
                row.push(this.blocks[3*i + j].values[3*i+2]);
    
                col.push(this.blocks[3*j + i].values[3*j]);
                col.push(this.blocks[3*j + i].values[3*j+1]);
                col.push(this.blocks[3*j + i].values[3*j+2]);
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
            if (entryCount[v] === undefined && (v in validValues)) {
                entryCount[v] = 1;
            } else {
                return false;
            }
        });

        return true;
    }

    public isSolvable(): boolean {
        // ############ 
        // | ^^   ^^  |
        // |  0   0   |
        // |    V     |
        // |  _____   |
        // \  \___/  / 
        //  \___|___/
        return false;
    }
}