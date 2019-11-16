const validValues: number[] = [1,2,3,4,5,6,7,8,9];

export class Block {
    public values: number[];  

    constructor() {
        this.values = [0,0,0,
                       0,0,0,
                       0,0,0];
    }

    public isValid(): boolean {
        //should be able store this elsewhere and update when move is made.
        let entryCount: any = {};
        
        this.values.filter(v => v !== 0).forEach(v => {
            if (entryCount[v] === undefined && (v in validValues)) {
                entryCount[v] = 1;
            } else {
                return false;
            }
        });

        return true;
    }


    public isSolved(): boolean {
        let seen: number[] = [];

        this.values.forEach(v => {
            if (v == 0 || !(v in validValues) || v in seen) {
                return false;
            }

            seen.push(v);
        });

        return true;
    }
}