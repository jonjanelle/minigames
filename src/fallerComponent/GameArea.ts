import { BlockEntity } from "../core/BlockEntity";
import { Text } from "../core/Text";
import { I2DEntity } from "../core/interfaces/I2DEntity";
import { ImageEntity } from "../core/ImageEntity";

export class GameArea {
    private context: CanvasRenderingContext2D;
    private myGamePiece: I2DEntity;
    private myScore: Text;
    private myObstacles: BlockEntity[];
    private canvas: HTMLCanvasElement;
    private gameSpeed: number;
    private intervalSize: number;
    private interval: NodeJS.Timeout | null = null;
    private frame: number;
    private minSpeed: number = -5;
    private maxSpeed: number = 5;
    private gravity: number; 

    constructor(canvasId: string) {
        this.canvas = (document.getElementById(canvasId) as HTMLCanvasElement);
        this.canvas.width = window.innerWidth;
        this.canvas.height = Math.floor(window.innerHeight*.7);
        
        this.context = (this.canvas.getContext("2d") as CanvasRenderingContext2D);
        // this.myGamePiece = new BlockEntity(30, 30, "red", {x: Math.floor(this.canvas.width*.2), y: 120});
        this.myGamePiece = new ImageEntity({x: Math.floor(this.canvas.width*.2), y: 120}, './images/flappy.png');
        this.myScore = new Text("24px", "Consolas", "black", {x: this.canvas.width*.65, y: 24}, "Hello there!");
        this.gravity = 0.15;
        this.myObstacles = [];
        this.intervalSize = 55;
        this.gameSpeed = 3;
        this.frame = 0;
        
        //  window.addEventListener('mousedown', this.checkInput, false);
        
        this.update = this.update.bind(this);
        this.checkInput = this.checkInput.bind(this);
    }
    
    public start(): void {
        window.addEventListener('keydown', this.checkInput, false);
        this.clear();
        this.frame = 0;
        this.myObstacles = [];
        if (this.interval !== null)
            clearInterval(this.interval);

        this.interval = setInterval(this.update, 20);
    }

    public pause(): void {
        window.removeEventListener("keydown", this.checkInput);
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    public resume(): void {
        window.addEventListener('keydown', this.checkInput, false);
        if (this.interval == null)
            this.interval = setInterval(this.update, 20);
    }

    public jump(): void {
        this.myGamePiece.vY = -4;
    }

    public checkInput(e: any): void {
        if (e.keyCode === 32 || e.type === "mousedown") {
            this.jump();
        } else if (e.key === "ArrowLeft" && this.myGamePiece.vX > this.minSpeed) {
            this.myGamePiece.vX = -5;
        } else if (e.key === "ArrowRight" && this.myGamePiece.vX < this.maxSpeed) {
            this.myGamePiece.vX = 5;
        }
    }
    

    public clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public update(): void {
        for (let i = 0; i < this.myObstacles.length; i += 1) {
            if (this.myGamePiece.collidesWith(this.myObstacles[i])) {
                this.myGamePiece.vY = 0;
                this.myGamePiece.position.y = this.myObstacles[i].position.y - this.myGamePiece.height; 
        
            } 
        }

        this.clear();
        this.frame += 1;

        if (this.frame === 1 || this.isNewInterval(this.intervalSize)) {
            let minWidth = Math.floor(0.10*this.canvas.width);
            let maxWidth = Math.floor(0.6*this.canvas.width);
            let width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
            let minGap = Math.floor(this.myGamePiece.width*2.5);
            let maxGap = 3*minGap;
            let gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            this.myObstacles.push(new BlockEntity(width, 10, "green", {x: 0, y: this.canvas.height}));
            this.myObstacles.push(new BlockEntity(this.canvas.width - width - gap, 10, "green", { x: width + gap, y: this.canvas.height}));
        }

        for (let i = 0; i < this.myObstacles.length; i += 1) {
            this.myObstacles[i].position.y -= this.gameSpeed;
            this.myObstacles[i].update(this.context, 0);
        }

        this.myScore.text = "SCORE: " + this.frame;
        
        this.myScore.update(this.context);
        this.myGamePiece.update(this.context, this.gravity);
    }
    
    private isNewInterval(n: number): boolean {
        return (this.frame / n) % 1 === 0;
    }
    

}