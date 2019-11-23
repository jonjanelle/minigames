import React from 'react';
import './Home.css';
import Faller from '../fallerComponent/Faller';
import Runner from '../runnerComponent/Runner';
import FlappyBlock from '../flappyComponent/FlappyBlock';
import MazeComponent from '../mazeComponent/MazeComponent';
import Evade from '../evadeComponent/evadeComponent';
import { MainController } from '../mainComponent/Main';
import Main from '../mainComponent/mainComponent';
import Sudoku from '../sudokuComponent/Sudoku';

export default class Home extends React.Component {
    private readonly faller: string = "faller";
    private readonly runner: string = "runner";
    private readonly flapper: string = "flapper";
    private readonly maze: string = "maze";
    private readonly evade: string = "evade";
    private readonly sudoku: string = "sudoku";
    private readonly scroller: string = "scroller";
    
    constructor(props: any) {
        super(props);
        this.state = {
            gameType: this.sudoku
        };
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }

    getGame(): any {
        if (this.gameType === this.faller)
            return <Faller></Faller>;
        else if (this.gameType === this.runner)
            return <Runner></Runner>;
        else if (this.gameType === this.flapper)
            return <FlappyBlock></FlappyBlock>;
        else if (this.gameType === this.evade)
            return <Evade></Evade>;
        else if (this.gameType === this.maze)
            return <MazeComponent></MazeComponent>;
        else if (this.gameType === this.scroller)
            return <Main></Main>;
        else 
            return <Sudoku></Sudoku>;
    }

    render() {
        return (
        <div className="Home">
            <div className=" game-container">
                {
                    this.getGame()
                    // <Sudoku></Sudoku>
                }
            </div>
            <div className="container-fluid menu-container">
              <div className="row">
                <div className="col-md-auto col-sm-3 mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.sudoku}>Sudoku</button></div>
                <div className="col-md-auto col-sm-3 mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.maze}>Maze</button></div>
                <div className="col-md-auto col-sm-3 mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.scroller}>Scroll</button></div>
                <div className="col-md-auto col-sm-3 mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.flapper}>Flap</button></div>
                <div className="col-md-auto col-sm-3 mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.runner}>Run</button></div>
                <div className="col-md-auto col-sm-3 mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.faller}>Fall</button></div>
                <div className="col-md-auto col-sm-3 mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.evade}>Evade</button></div>
              </div>
            </div>
        </div>
        );
    }

    get gameType(): string {
        return ((this.state as any).gameType as string);
    }

    set gameType(newType: string) {
        this.setState({gameType: newType});
    }
}
