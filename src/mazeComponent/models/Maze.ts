import { Cell } from "./Cell";
import { MazeUtils }  from "./MazeUtils";
import { INeighborCandidate } from "./INeighborCandidate";
import { I2DCoordinate } from "../../core/interfaces/I2DCoordinate";

export class Maze {
    public cells: Cell[][];
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = []; 
    }

    public clear(): void {
        this.cells = [];
        for (let i = 0; i < this.height; i++) {
            let row: Cell[] = [];
            for (let j = 0; j < this.width; j++) {
                row.push(new Cell(j, i));
            }

            this.cells.push(row);
        }
    }

    public generate(startX: number, startY: number): void {
        this.clear();
        let pathStack = [];
        let currentCell = this.cells[startY][startX];
        while (this.anyUnvisited()) {
            currentCell.isVisited = true;
            let nextVisit = this.getUnvisitedNeighbor(currentCell.x, currentCell.y);
            if (nextVisit !== null) {
                pathStack.push(currentCell);
                currentCell.removeWall(nextVisit.dir);
                currentCell = this.cells[nextVisit.y][nextVisit.x];
                currentCell.removeWall(new MazeUtils().getInverseDir(nextVisit.dir));
            }
            else {
                while (pathStack.length > 0) {
                    let cell = pathStack.pop() as Cell;
                    if (this.getUnvisitedNeighbor(cell.x, cell.y) !== null) {
                        currentCell = cell;
                        break;
                    }
                }
            }
        }
    }

    // start/end are Coordinates
    // 
    public getSolution(start: I2DCoordinate, end: I2DCoordinate): Cell[] {
        let pathStack: Cell[] = [];
        let solutionPath: Cell[] = [];

        pathStack.push(this.cells[start.y][start.x]);
        while (pathStack.length > 0) {
            let current: Cell = pathStack.pop() as Cell;
            
            solutionPath.push(current);
            
            if (current.x === end.x && current.y === end.y)
                break;

            if (current.leftOpen && !this.cells[current.y][current.x - 1].isVisited)
                pathStack.push(this.cells[current.y][current.x - 1]);
            if (current.rightOpen && !this.cells[current.y][current.x + 1].isVisited)
                pathStack.push(this.cells[current.y][current.x + 1]);
            if (current.upOpen && !this.cells[current.y - 1][current.x].isVisited)
                pathStack.push(this.cells[current.y - 1][current.x]);
            if (current.downOpen && !this.cells[current.y + 1][current.x].isVisited)
                pathStack.push(this.cells[current.y + 1][current.x]);
        }

        return solutionPath;
    }

    private anyUnvisited(): boolean {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                if (!this.cells[i][j].isVisited)
                    return true;
            }
        }

        return false;
    }

    private getUnvisitedNeighbor(x: number, y: number): INeighborCandidate | null {
        let neighborCandidates: INeighborCandidate[] = [];
        if (y > 0 && !this.cells[y-1][x].isVisited)
            neighborCandidates.push({x: x, y: y-1, dir: "up"});
        if (y < this.cells.length - 1 && !this.cells[y+1][x].isVisited)
            neighborCandidates.push({x: x, y: y+1, dir: "down"});
        if (x > 0 && !this.cells[y][x-1].isVisited)
            neighborCandidates.push({x: x-1, y: y, dir: "left"});
        if (x < this.cells[y].length - 1 && !this.cells[y][x+1].isVisited)
            neighborCandidates.push({x: x+1, y: y, dir: "right"});
        
        if (neighborCandidates.length === 0)
            return null;
        
        return neighborCandidates[Math.floor(Math.random() * neighborCandidates.length)];
    }

    public isDirectionOpen(x: number, y: number, dir: string): boolean {
        let isOpen = false;
        if (dir === "up" && this.cells[y][x].upOpen)
            isOpen = true;
        else if (dir === "down" && this.cells[y][x].downOpen)
            isOpen = true;
        else if (dir === "left" && this.cells[y][x].leftOpen)
            isOpen = true;
        else if (dir === "right" && this.cells[y][x].rightOpen)
            isOpen = true;
        return isOpen;
    }
}