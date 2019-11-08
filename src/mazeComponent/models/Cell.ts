export class Cell {
    public isVisited: boolean;
    public leftOpen: boolean;
    public rightOpen: boolean;
    public upOpen: boolean;
    public downOpen: boolean;
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.isVisited = false;
        this.leftOpen = false;
        this.rightOpen = false;
        this.downOpen = false;
        this.upOpen = false;
        this.x = x;
        this.y = y;
    }

    public removeWall(dir: string): void {
        if (dir === "up")
            this.upOpen = true;
        else if (dir === "down")
            this.downOpen = true;
        else if (dir === "left")
            this.leftOpen = true;
        else if (dir === "right")
            this.rightOpen = true;
    }
}