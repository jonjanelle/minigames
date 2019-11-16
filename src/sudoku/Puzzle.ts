import { Block } from "./Block";

export class Puzzle {
    public blocks: Block[];
   
    constructor() {
        this.blocks = [new Block(), new Block(), new Block(),
                        new Block(), new Block(), new Block(),
                        new Block(), new Block(), new Block()];
    }


    // does not consider solvability, just looks for duplicates in a row, col, or within a Block
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


        return false;
    }

    public isSolvable(): boolean {
        
        return false;
    }
}