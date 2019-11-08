export interface IGameContainer {
    start: () => void;
    pause: () => void;
    resume: () => void;
    game: any;
}