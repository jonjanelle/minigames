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
    private gravity: number;

    constructor(canvasId: string) {
        this.canvas = (document.getElementById(canvasId) as HTMLCanvasElement);
        this.canvas.width = Math.floor(window.innerWidth*.75);
        this.canvas.height = Math.floor(window.innerHeight*.5);
        
        this.context = (this.canvas.getContext("2d") as CanvasRenderingContext2D);
        // this.myGamePiece = new BlockEntity(30, 30, "red", {x: Math.floor(this.canvas.width*.2), y: 120});
        this.myGamePiece = new ImageEntity({x: Math.floor(this.canvas.width*.2), y: 120}, './images/flappy.png');
        this.myScore = new Text("24px", "Consolas", "black", {x: this.canvas.width*.65, y: 24}, "Hello there!");

        this.gravity = 0.15;

        this.myObstacles = [];
        this.intervalSize = 120;
        this.gameSpeed = 6;
        this.frame = 0;
        
        
        this.update = this.update.bind(this);
        this.checkInput = this.checkInput.bind(this);
    }
    
    private addListeners(): void {
        window.addEventListener('mousedown', this.checkInput, false);
        window.addEventListener('keydown', this.checkInput, false);        
    }

    public removeListeners(): void {
        window.removeEventListener("keydown", this.checkInput);
        window.removeEventListener("mousedown", this.checkInput);
    }

    public start(): void {
        this.removeListeners();
        this.addListeners();
        this.clear();
        this.frame = 0;
        this.myObstacles = [];
        if (this.interval !== null)
            clearInterval(this.interval);

        this.interval = setInterval(this.update, 20);
    }

    public pause(): void {
        this.removeListeners();
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    public resume(): void {
        this.addListeners();
        if (this.interval == null)
            this.interval = setInterval(this.update, 20);
    }

    public jump(): void {
        this.myGamePiece.vY = -4;
    }

    public checkInput(e: any): void {
        if (e.keyCode === 32 || e.type === "mousedown") {
            this.jump();
        }
    }
    

    public clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public update(): void {
        for (let i = 0; i < this.myObstacles.length; i += 1) {
            if (this.myGamePiece.collidesWith(this.myObstacles[i])) {
                return;
            } 
        }

        this.clear();
        this.frame += 1;

        if (this.frame === 1 || this.isNewInterval(this.intervalSize)) {
            let minHeight = Math.floor(0.10*this.canvas.height);
            let maxHeight = Math.floor(0.6*this.canvas.height);
            let height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            let minGap = Math.floor(this.myGamePiece.height*2.5);
            let maxGap = 3*minGap;
            let gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            this.myObstacles.push(new BlockEntity(10, height, "green", {x: this.canvas.width, y: 0}));
            this.myObstacles.push(new BlockEntity(10, this.canvas.height - height - gap, "green", {x: this.canvas.width, y: height + gap}));
        }

        for (let i = 0; i < this.myObstacles.length; i += 1) {
            this.myObstacles[i].position.x -= this.gameSpeed;
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