
export class Cell {
    public value: number; 
    public isSelected: boolean;
    public notes: number[];

    constructor(value: number) {
        this.value = value;
        this.isSelected = false;
        this.notes = [];
    }

    public addNote(value: number) {
        if (this.notes.findIndex(v => v === value) < 0) {
            this.notes.push(value);
            this.notes.sort();
        }
    }

    public setValue(value: number) { 
        this.value = value;
        this.notes = [];
    }
}