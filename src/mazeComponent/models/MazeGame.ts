import { Maze } from "./Maze";
import { ImageEntity } from "../../core/ImageEntity";

export class MazeGame {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private boardSize: number;
    private boxSize: number;
    private endX: number;
    private maze: Maze;
    private endY: number;
    private pad: number;
    private player: ImageEntity;

    constructor(size: number, canvasId: string) {
        this.boardSize = size;
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.pad = 10;
        this.boxSize = Math.floor((this.canvas.width-2*this.pad)/size);
        this.endY = this.boardSize - 1;
        this.endX = this.boardSize - 1;
        this.drawPlayer = this.drawPlayer.bind(this);
        this.clearCell = this.clearCell.bind(this);
        this.inputListener = this.inputListener.bind(this);
        this.player = new ImageEntity({x: 0, y: 0}, "./images/maze/player.png");
        this.maze = new Maze(this.boardSize, this.boardSize);
    }
    
    // public methods
    
    public start(): void {
        this.player.load().then(() => {
            this.clear();
            this.drawMaze();
            this.drawPlayer();
            window.addEventListener("keydown", this.inputListener);
            // [new GridAnimator('images/maze/spud.png', this.context, this.boxSize, 4, 2, {x: 0, y: 1}, this.clearCell), 
            //  new GridAnimator('images/maze/boom.png', this.context, this.boxSize, 9, 9, {x: 1, y: 0}, this.clearCell)].map(a => a.animate());
        });
    }
    
    public clear(): void {
        window.removeEventListener("keydown", this.inputListener);
        this.context.fillStyle = "#FFFFFF";
        this.context.clearRect(0, 0, this.boardSize*this.boxSize + this.pad, this.boardSize*this.boxSize + this.pad);
    }
    
    public pause(): void {

    }
    
    public reset(): void {
        this.maze = new Maze(this.boardSize, this.boardSize);
        this.maze.generate(0, 0);
        
        this.start();
    }

    // end public methods

    private inputListener(event: KeyboardEvent): void {
        let positionChanged = true;
        let previousPosition = [this.player.position.x, this.player.position.y];
        if (event.key === "ArrowLeft" && this.player.position.x > 0 && this.maze.isDirectionOpen(this.player.position.x, this.player.position.y, "left")) {
            this.player.position.x -= 1;
        } else if (event.key === "ArrowRight" && this.player.position.x < this.boardSize - 1 && this.maze.isDirectionOpen(this.player.position.x, this.player.position.y, "right")) {
            this.player.position.x += 1;
        } else if (event.key === "ArrowUp" && this.player.position.y > 0 && this.maze.isDirectionOpen(this.player.position.x, this.player.position.y, "up")) {
            this.player.position.y -= 1;
        } else if (event.key === "ArrowDown" && this.player.position.y < this.boardSize - 1 && this.maze.isDirectionOpen(this.player.position.x, this.player.position.y, "down")) {
            this.player.position.y += 1;
        } else if (event.key === 'r') {
            this.reset();
            positionChanged = false;
        } else {
            positionChanged = false;
        }
        
        if (positionChanged) {
            this.clearCell(previousPosition[0], previousPosition[1]);
            this.drawPlayer();
            this.checkForWin();
        }
    }

    private checkForWin(): void {
        if (this.player.position.y === this.endY && this.player.position.x === this.endX) {
            this.reset();
        }
    }

    private clearCell(x: number, y: number): void {
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect(this.boxSize*x + 12, this.boxSize*y + 12, 54, 54);
    }

    private drawMaze(): void {
        this.clear();
        console.log(this.maze);
        for (let i = 0; i < this.maze.cells.length; i++) {
            for (let j = 0; j < this.maze.cells[i].length; j++) {
                if (!this.maze.cells[i][j].rightOpen) {
                    this.context.moveTo(this.boxSize*(j + 1) + this.pad, this.boxSize*i + this.pad);
                    this.context.lineTo(this.boxSize*(j + 1) + this.pad, this.boxSize*(i + 1) + this.pad);
                }
                if (!this.maze.cells[i][j].leftOpen) {
                    this.context.moveTo(j*this.boxSize + this.pad, this.boxSize*i + this.pad);
                    this.context.lineTo(j*this.boxSize + this.pad, this.boxSize*(i+1) + this.pad);
                }
                if (!this.maze.cells[i][j].upOpen) {
                    this.context.moveTo(this.boxSize*j + this.pad, this.boxSize*i + this.pad);
                    this.context.lineTo(this.boxSize*(j + 1) + this.pad, this.boxSize*i + this.pad);
                }   
                if (!this.maze.cells[i][j].downOpen) {
                    this.context.moveTo(this.boxSize*j + this.pad, this.boxSize*(i + 1) + this.pad);
                    this.context.lineTo(this.boxSize*(j + 1) + this.pad, this.boxSize*(i + 1) + this.pad);
                }   
                this.context.stroke();
            }
        }

        this.context.fillStyle = "rgba(0, 255, 0, .35)";
        this.context.fillRect(this.boxSize*this.endX + this.pad, this.boxSize*this.endY + this.pad, this.boxSize, this.boxSize);
    }

    private drawPlayer(): void {
        this.context.drawImage(this.player.image, this.player.position.x*this.boxSize + 12, this.player.position.y*this.boxSize + 12)
    }
}