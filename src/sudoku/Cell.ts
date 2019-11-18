
export class Cell {
    public value: number; 
    public isSelected: boolean;

    constructor(value: number) {
        this.value = value;
        this.isSelected = false;
    }
}