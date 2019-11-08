import { SpriteAnimator } from "./SpriteAnimator";
import { I2DCoordinate } from "./interfaces/I2DCoordinate";

export class GridAnimator extends SpriteAnimator {
    public clearCallback: Function;
    public context: CanvasRenderingContext2D;
    
    private xPos: number;
    private yPos: number;
    private boxSize: number;
    private animationInterval: NodeJS.Timeout | null = null;


    constructor(imagePath: string, context: CanvasRenderingContext2D, 
                boxSize: number, nRows: number, nCols: number, 
                startCoordinate: I2DCoordinate, clearCallback: Function) {
        super(imagePath, nRows, nCols, startCoordinate);
        this.clearCallback = clearCallback;
        this.context = context;
        this.boxSize = boxSize;
        this.xPos = 0;
        this.yPos = 0;
    }

    animate() {
        if (this.animationInterval === null) {
            this.load().then(() => {
                this.animationInterval = setInterval(() => {
                    this.clearCallback(this.spriteSheet.position.x, this.spriteSheet.position.y);
                    this.context.drawImage(this.spriteSheet.image, this.sWidth*this.xPos, this.sHeight*this.yPos, 
                                           this.sWidth, this.sHeight, this.spriteSheet.position.x*this.boxSize + 12, 
                                           this.spriteSheet.position.y*this.boxSize + 12, 54, 54);
                    this.xPos += 1;
                    if (this.xPos === this.nCols) {
                        this.xPos = 0;
                        this.yPos += 1;
                        if (this.yPos === this.nRows) {
                            this.yPos = 0;
                        }
                    }
                }, 50);
            }, (err) => {
                console.error("Animate error:", err);
            });
        }
    }

    stop() {
        if (this.animationInterval !== null) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }
}