import { Block } from "./Block";
import { Constants } from "./Constants";
import { timingSafeEqual } from "crypto";

export default class Puzzle {
    public blocks: Block[];
    constructor() {
        
        this.blocks = [new Block(), new Block(), new Block(),
                        new Block(), new Block(), new Block(),
                        new Block(), new Block(), new Block()];

        this.generate();
    }


    /**
     * true if the current configuration is valid. 
     * Does not confirm that the puzzle is solved or that all entries are in the correct positions.
     *  */  
    public isValid(): boolean {
        for (let i = 0; i < this.blocks.length; i++) {
            let blockValues = this.blocks[i].cells.map(c => c.value);
            if (!this.isValidCollection(blockValues, false)) {
                return false;
            }
        }

        return this.checkRowsAndCols();
    }

    /**
     * true if the puzzle is fully solved.
     */
    public isSolved(): boolean {
        this.blocks.forEach(b => {
            if (!b.isSolved())
                return false;
        });

        if (!this.checkRowsAndCols(true)) {
            return false
        }

        return true;
    }


    private checkRowsAndCols(isSolved: boolean = false, debug: boolean=false): boolean {
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
            console.log("row: ", row, "col", col);
            if (!(this.isValidCollection(row, isSolved) && this.isValidCollection(col, isSolved))) {
                return false;
            }
        }

        return true;
    }
    
    private isValidValue(value: number): boolean {
        return (Constants.validValues.findIndex(vv => vv === value) >= 0);
    }

    private isValidCollection(values: number[], isSolved: boolean): boolean {
        values = values.filter(v => v !== 0);
    
        if (isSolved && values.length !== 9) {
            return false;
        }

        let entryCount: any = {};
        for (let v of values) {
            if (entryCount[v] === undefined && this.isValidValue(v)) {
                entryCount[v] = 1;
            } else {
                return false;
            }
        }
    
        return true;
    }


    /**
     * Get a random int in the range [a, b]
     * @param min lower bound
     * @param max upper bound
     *  */ 
    private randInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

    /**
     * Get the total number of empty cells across all blocks.
     */
    private emptyCount(): number {
        return this.blocks.map(b => b.cells.filter(c => c.value === 0).length).reduce((total, current) => current + total);
    }


    /**
     * 
     * [1] Randomly take any number 1-9 (one not tried before).
     * [2] Check if it is safe to put in the cell (row, column, and box).
     * [3] If safe: place it and increment to next location, then go to step 1.
     * [4] If not safe:  Maintain current position and go to step 1.
     * [5] Once matrix is fully filled, remove k no. of elements randomly to complete game.
     */
    public generate() {
        let currentBlock = 0;
        let currentCell = 0;
        let candidates: number[] =  Object.assign([], Constants.validValues);
        let tries = 0;

        while (this.emptyCount() > 0 && currentBlock < this.blocks.length && tries < 1000) {
            tries++;
            let valuePlaced = false;
            for (let i = 0; i < candidates.length; i++) {
                let valueIndex = this.randInt(0, candidates.length - 1);
                this.blocks[currentBlock].cells[currentCell].value = candidates[valueIndex];
                if (this.isValid()){
                    candidates = candidates.filter(c => c !== candidates[valueIndex]);
                    valuePlaced = true;
                    break;
                }
            }

            if (valuePlaced) {
                if (currentCell < this.blocks[currentBlock].cells.length-1) {
                    currentCell += 1;
                } else {
                    currentCell = 0;
                    currentBlock += 1;
                    candidates =  Object.assign([], Constants.validValues);
                }
            }
        }
    }

    /**
     * Fisher-Yates shuffle
     * @param array Array to shuffle
     */
    private shuffle<T>(array: T[]): T[] {
        let position: number = array.length;
        let temp: T, i: number;
        
        while (position > 0) {
            // Pick an unshuffled element
            i = Math.floor(Math.random() * position--);
        
            // And swap it with the current element.
            temp = array[position];
            array[position] = array[i];
            array[i] = temp;
        }
    
        return array;
    }

    /**
     * Method not needed.
     */
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