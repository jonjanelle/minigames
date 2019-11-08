import React from 'react';
import './Faller.css';
import { GameArea } from './GameArea';
import { IGameContainer } from '../core/interfaces/IGameContainer';

export default class Faller extends React.Component implements IGameContainer {
    get game(): GameArea { return ((this.state as any).game as GameArea); }

    get paused(): boolean { return ((this.state as any).paused as boolean); }
    set paused(value: boolean) { this.setState({paused: value}); }

    constructor(props: any) {
        super(props);

        this.state = {
            score: 0,
            scoreHistory: [],
            paused: false
        };

        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        document.addEventListener('click', this.clickListener);
    }

    clickListener() {
        let element = document.activeElement;
        if (element !== null && element.toString() == '[object HTMLButtonElement]')
            (element as HTMLButtonElement).blur(); 
    }

    componentDidMount() {
        this.setState({game: new GameArea("canvas")});
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.clickListener);
    }

    start(): void {
        this.paused = false;
        this.game.start();
    }

    pause(): void {
        this.game.pause();
        this.paused = true;
    }

    resume(): void {
        this.paused = false;
        this.game.resume();
    }

    getPauseResume(): any {
        if (this.paused) {
            return (
            <button type="button" className="btn btn-primary mr-3" onClick={ () => this.resume()}>
                <i className="far fa-play-circle icon"></i>
                <small className="icon-label">Resume</small>
            </button>
            );
        } else {
            return (
            <button type="button" className="btn btn-warning mr-3" onClick={() => this.pause()}>
                <i className="far fa-pause-circle icon"></i>
                <small className="icon-label">Pause</small>
            </button>
            );
        }
    }

    render() {
        return (
            <div className="canvas-container"> 
                <canvas id="canvas"></canvas>
                <div className="row w-100 mt-3">
                    <div className="col-12 text-center">
                        <div className="col-12 text-center mt-3">
                            <button type="button" className="btn btn-success ml-3 mr-3" onClick={() => this.start()}>
                                <i className="fas fa-redo icon"></i>
                                <small className="icon-label">Start</small>
                            </button>
                            {this.getPauseResume()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
