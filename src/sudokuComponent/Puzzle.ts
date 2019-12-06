import { Block } from "./Block";
import { Constants } from "./Constants";
import { timingSafeEqual } from "crypto";

export default class Puzzle {
    public blocks: Block[] = [];
    
    constructor() {
        this.generate();
    }

    private resetBlocks(): void {
        this.blocks = [new Block(), new Block(), new Block(),
            new Block(), new Block(), new Block(),
            new Block(), new Block(), new Block()];
    }

    /**
     * @param isSolved true if board must be solved to return true, false if it only must be value
     *  */  
    public checkBoard(isSolved: boolean = false): boolean {
        for (let i = 0; i < this.blocks.length; i++) {
            let blockValues = this.blocks[i].cells.map(c => c.value);
            if (!this.isValidCollection(blockValues, isSolved)) {
                return false;
            }
        }

        return this.checkRowsAndCols(isSolved);
    }


    private checkRowsAndCols(isSolved: boolean = false): boolean {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++) {
                let row: number[] = [];
                let col: number[] = [];

                row.push(this.blocks[3*i].cells[3*j].value);
                row.push(this.blocks[3*i].cells[3*j + 1].value);
                row.push(this.blocks[3*i].cells[3*j + 2].value);
                row.push(this.blocks[3*i+1].cells[3*j].value);
                row.push(this.blocks[3*i+1].cells[3*j + 1].value);
                row.push(this.blocks[3*i+1].cells[3*j + 2].value);
                row.push(this.blocks[3*i+2].cells[3*j].value);
                row.push(this.blocks[3*i+2].cells[3*j + 1].value);
                row.push(this.blocks[3*i+2].cells[3*j + 2].value);
          
                col.push(this.blocks[i].cells[j].value);
                col.push(this.blocks[i].cells[j+3].value);
                col.push(this.blocks[i].cells[j+6].value);
                col.push(this.blocks[i+3].cells[j].value);
                col.push(this.blocks[i+3].cells[j+3].value);
                col.push(this.blocks[i+3].cells[j+6].value);
                col.push(this.blocks[i+6].cells[j].value);
                col.push(this.blocks[i+6].cells[j+3].value);
                col.push(this.blocks[i+6].cells[j+6].value);

                if (!(this.isValidCollection(row, isSolved) && this.isValidCollection(col, isSolved))) {
                    return false;
                }
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

    public generate() {
        let currentBlock = 0;
        let currentCell = 0;

        // let first = true;
        // while (first || !this.checkBoard(true)) {
            this.resetBlocks();
            // first = false;
            while (this.emptyCount() > 0 && currentBlock < this.blocks.length) {
                let valuePlaced = false;
                let candidates =  Object.assign([], Constants.validValues);
                
                //
                for (let i = 0; i < candidates.length; i++) {
                    let valueIndex = this.randInt(0, candidates.length - 1);
                    this.blocks[currentBlock].cells[currentCell].value = candidates[valueIndex];
                    candidates = candidates.filter(c => c !== candidates[valueIndex]);
                    
                    if (this.checkBoard()){
                        valuePlaced = true;
                        break;
                    } else {
                        this.blocks[currentBlock].cells[currentCell].value = 0;
                    }
                }
    
                // if (valuePlaced) {
                    if (currentCell < this.blocks[currentBlock].cells.length-1) {
                        currentCell += 1;
                    } else {
                        currentCell = 0;
                        currentBlock += 1;
                    }
                // }
            }
        // }
    }

    private printRowsAndCols(): void {
        let rows = [];
        let cols = [];

        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++) {
                let row: number[] = [];
                let col: number[] = [];

                row.push(this.blocks[3*i].cells[3*j].value);
                row.push(this.blocks[3*i].cells[3*j + 1].value);
                row.push(this.blocks[3*i].cells[3*j + 2].value);
                row.push(this.blocks[3*i+1].cells[3*j].value);
                row.push(this.blocks[3*i+1].cells[3*j + 1].value);
                row.push(this.blocks[3*i+1].cells[3*j + 2].value);
                row.push(this.blocks[3*i+2].cells[3*j].value);
                row.push(this.blocks[3*i+2].cells[3*j + 1].value);
                row.push(this.blocks[3*i+2].cells[3*j + 2].value);
            
                col.push(this.blocks[i].cells[j].value);
                col.push(this.blocks[i].cells[j+3].value);
                col.push(this.blocks[i].cells[j+6].value);
                
                col.push(this.blocks[i+3].cells[j].value);
                col.push(this.blocks[i+3].cells[j+3].value);
                col.push(this.blocks[i+3].cells[j+6].value);
                
                col.push(this.blocks[i+6].cells[j].value);
                col.push(this.blocks[i+6].cells[j+3].value);
                col.push(this.blocks[i+6].cells[j+6].value);

                rows.push(row);
                cols.push(col);
            }
        }

        console.log("rows", rows);
        console.log("cols", cols);
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

    private getPossibleValues(blockIndex: number, cellIndex: number): number[] {
        
        return [];
    }

    /**
     * TODO
     */
    public solve(blockIndex: number, cellIndex: number): boolean {
        if (blockIndex >= 8 && cellIndex > 8)
          return true
      
        // The list of possible values: the intersection of values not
        // already in the cell's row, column or square
        let possibleValues: number[] = []; // board.get_possible_values_at(cell_index)
      
        // Keep track of the original value so we can set it back if all the possible values don't work
        let originalValue = this.blocks[blockIndex].cells[cellIndex].value;
      
        // iterate through each value
        for (let value of possibleValues) {
            // Set the cell to the new value
            this.blocks[blockIndex].cells[cellIndex].value = value;
        
            // recursively call solve, if this call returns true than the puzzle
            // is solved if it's not we need to try the next possible value
            if (cellIndex < this.blocks[blockIndex].cells.length-1) {
                cellIndex += 1;
            } else {
                cellIndex = 0;
                blockIndex += 1;
            }

            if (this.solve(blockIndex, cellIndex))
              return true;
        }

        //current board not solvable 
        return false;
    }
}