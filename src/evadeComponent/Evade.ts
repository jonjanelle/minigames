import { StaticImage } from "./StaticImage";
import { SpriteEntity } from "./SpriteEntity";
import { GridAnimator } from "../core/GridAnimator";
import { AnimatedSpriteEntity } from "./AnimatedSpriteEntity";

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

export class EvadeController {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private keysDown: any[] = [];
    private frameTimer: number = 0; 
    private background: StaticImage;
    private player: SpriteEntity;
    private enemies: (SpriteEntity | AnimatedSpriteEntity)[];
    private score: number;

    constructor(canvasId: string) {
        this.canvas = (document.getElementById(canvasId) as HTMLCanvasElement);
        this.context = (this.canvas.getContext("2d") as CanvasRenderingContext2D);
        
        this.background = new StaticImage("images/evade/bg/backgrounddetailed5.png", {x: 0, y: 0});
        this.player = new SpriteEntity("images/evade/hero.png", {x: 100, y: 100}, 3);
        this.enemies = [
            //new SpriteEntity("images/evade/monster.png", {x: 150, y: 100}, 0),
            //new SpriteEntity("images/evade/monster.png", {x: 250, y: 100}, 1),
            // new AnimatedSpriteEntity("images/evade/boxes.png", 1, 8, {x: 150, y: 200}),
            new AnimatedSpriteEntity("images/evade/worm.png", 1, 31, {x: 50, y: 200}),
            new AnimatedSpriteEntity("images/evade/demon-white_2.png", 6, 9, {x: 70, y: 300}, 11),
            new AnimatedSpriteEntity("images/evade/earth.png", 16, 16, {x: 250, y: 50}, 5),
            new AnimatedSpriteEntity("images/evade/orc.png", 6, 9, {x: 275, y: 150}, 5),
            new AnimatedSpriteEntity("images/evade/buffbaby.png", 6, 9, {x: 350, y: 150}, 8), 
            new AnimatedSpriteEntity("images/evade/orc2.png", 4, 9, {x: 275, y: 250}, 7),
            new AnimatedSpriteEntity("images/evade/skeleton.png", 4, 9, {x: 350, y: 250}, 7), 
            new AnimatedSpriteEntity("images/evade/girl.png", 4, 9, {x: 225, y: 250}, 7), 
            new AnimatedSpriteEntity("images/evade/girl2.png", 4, 9, {x: 425, y: 250}, 7), 
            new AnimatedSpriteEntity("images/evade/fox.png", 4, 3, {x: 350, y: 350}, 21),
            new AnimatedSpriteEntity("images/evade/dragon.png", 4, 3, {x: 425, y: 350}, 21),
            new AnimatedSpriteEntity("images/evade/wolf.png", 4, 3, {x: 275, y: 350}, 21),
            new AnimatedSpriteEntity("images/evade/brainkid.png", 8, 12, {x: 75, y: 150}, 21),
            new AnimatedSpriteEntity("images/evade/goal.png", 4, 5, {x: 350, y: 25}, 5),
        ];
        
        this.player.load();
        this.enemies.forEach(e => e.load());

        this.canvas.width = window.innerWidth;
        this.canvas.height = Math.floor(0.7*window.innerHeight);

        this.score = 0;

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
        if (38 in this.keysDown) //  Up
            this.player.position.y -= Math.floor(this.player.speed * modifier);
        if (40 in this.keysDown) // Down
            this.player.position.y += Math.floor(this.player.speed * modifier);
        if (37 in this.keysDown) // Left 
            this.player.position.x -= Math.floor(this.player.speed * modifier);
        if (39 in this.keysDown) // Right
            this.player.position.x += Math.floor(this.player.speed * modifier);

        //this.updateEnemies();

        
        let collisions = this.enemies.filter(e => e.collidesWith(this.player));

        for (let c of collisions) {
            this.score += 1;
            c.position.x = Math.floor((Math.random()*this.canvas.width) + 1);
            c.position.y = Math.floor(Math.random() * (this.canvas.height) + 1);
        }
    }

    private updateEnemies(): void {
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            
            if (Math.random() < .6) {
                if (enemy.position.y > this.player.position.y) {
                    enemy.position.y -= 1;
                } else {
                    enemy.position.y += 1;
                }
            }
            
            if (Math.random() < .6) {
                if (enemy.position.x > this.player.position.x) {
                    enemy.position.x -= 1;
                } else 
                    enemy.position.x += 1;
            }
        }
    }

    private render(): void {
        this.background.update(this.context);
        this.player.update(this.context, 0);
        for (let enemy of this.enemies){
            enemy.update(this.context, 0);
        }

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