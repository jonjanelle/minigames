import { StaticImage } from "./models/StaticImage";
import { SpriteEntity } from "./models/SpriteEntity";
import { GridAnimator } from "../core/GridAnimator";
import { AnimatedSpriteEntity } from "./models/AnimatedSpriteEntity";
import { Tile } from "./models/Tile";
import { BoxCollider } from "./models/BoxCollider";

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

export class MainController {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private keysDown: any[] = [];
    private frameTimer: number = 0; 
    private backgrounds: StaticImage[];
    private player: SpriteEntity;
    private tiles: Tile[];
    private score: number;
    private gravity: number;


    //Todo: Make separate player class and move this.
    private isJumping: boolean = false;

    constructor(canvasId: string) {
        this.canvas = (document.getElementById(canvasId) as HTMLCanvasElement);
        this.context = (this.canvas.getContext("2d") as CanvasRenderingContext2D);
        this.backgrounds = [
            new StaticImage("images/main/bg.png", {x: 0, y: 0}),
            new StaticImage("images/main/bg.png", {x: 250, y: 0}),
            new StaticImage("images/main/bg.png", {x: 0, y: 250}),
            new StaticImage("images/main/bg.png", {x: 250, y: 250})
        ]

        this.player = new SpriteEntity("images/evade/hero.png", {x: 100, y: 100}, 3);
        this.tiles = [
            new Tile("images/main/tiles/hill_small.png", {x: 20, y: 320}),
            new Tile("images/main/tiles/hill_small.png", {x: 90, y: 310}),
            new Tile("images/main/tiles/hill_small.png", {x: 160, y: 300}),
            new Tile("images/main/tiles/grassCliffLeft.png", {x:10, y: 400}, new BoxCollider()),
            new Tile("images/main/tiles/grassMid.png", {x:80, y: 400}, new BoxCollider()),
            new Tile("images/main/tiles/grassCliffRight.png", {x: 150, y: 400}, new BoxCollider()),


            new Tile("images/main/tiles/hill_small.png", {x: 290, y: 300}),
            new Tile("images/main/tiles/hill_small.png", {x: 360, y: 310}),
            new Tile("images/main/tiles/hill_small.png", {x: 430, y: 320}),
            new Tile("images/main/tiles/grassCliffLeft.png", {x: 280, y: 400}, new BoxCollider()),
            new Tile("images/main/tiles/grassMid.png", {x:350, y: 400}, new BoxCollider()),
            new Tile("images/main/tiles/grassCliffRight.png", {x: 420, y: 400}, new BoxCollider()),


            new Tile("images/main/tiles/stoneHalf.png", {x:210, y: 200})
        ];
        
        this.player.load();

        this.canvas.width = 500;
        this.canvas.height = 500;

        this.score = 0;
        this.gravity = 1;

        this.keyDownListener = this.keyDownListener.bind(this);
        this.keyUpListener = this.keyUpListener.bind(this);
        this.main = this.main.bind(this);
        this.clearCell = this.clearCell.bind(this);

        this.frameTimer = Date.now();
        this.addListeners();
        this.main();
    }
    
    private clearCell(x: number, y: number): void {
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect(x,  y, 24, 24);
    }

    public addListeners(): void {
        window.addEventListener("keydown", this.keyDownListener, false);
        window.addEventListener("keyup", this.keyUpListener, false);
    }

    public removeListeners(): void {
        window.removeEventListener("keydown", this.keyDownListener);
        window.removeEventListener("keyup", this.keyUpListener);
    }

    private keyDownListener(e: any): void {
        this.keysDown[e.keyCode] = true;
    }

    private keyUpListener(e: any): void {
        delete this.keysDown[e.keyCode];
    }

    public update(modifier: number): void {

        
        let collisions = this.tiles.filter(e => e.collidesWith(this.player));
        if (collisions.length > 0) { 
            this.player.vY = 0;
            this.player.vY = -1*this.gravity;
            this.player.position.y = collisions[0].position.y - this.player.height;
            this.isJumping = false;
        }
        
        //Left and right movement
        if (!(37 in this.keysDown || 39 in this.keysDown)) {
            this.player.vX = 0;
        } else {
            if (37 in this.keysDown && this.player.vX > -this.player.speed) // Left 
                this.player.vX -= 1;
            if (39 in this.keysDown && this.player.vX < this.player.speed) // Right
                this.player.vX += 1;
        }

        //jump
        if (32 in this.keysDown && !this.isJumping) {
            this.player.vY -= 15;
            this.isJumping = true;
        }
       
    }

    private render(): void {
        for (let bg of this.backgrounds) {
            bg.update(this.context);
        }

        for (let tile of this.tiles){
            tile.update(this.context);
        }
        
        this.player.update(this.context, this.gravity);
        this.drawScore();
    }
    
    private drawScore(): void {
        this.context.fillStyle = "rgb(250, 250, 250)";
        this.context.font = "24px Helvetica";
        this.context.textAlign = "left";
        this.context.textBaseline = "top";
        this.context.fillText("Score: " + this.score, 32, 32);
    }

    public main(): void {
        const now = Date.now();
        const delta = now - this.frameTimer;
    
        this.update(delta / 10);
        this.render();
        
        this.frameTimer = now;
        
        requestAnimationFrame(this.main);
    }
}