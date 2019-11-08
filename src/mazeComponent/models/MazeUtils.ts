export class MazeUtils {
    public getInverseDir(dir: string): string {
        
        if (dir === "up")
            return "down";
        else if (dir === "down")
            return "up";
        else if (dir === "left")
            return "right";
        else if (dir === "right")
            return "left";
        else 
            return "";
    }
}