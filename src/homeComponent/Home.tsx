import React from 'react';
import './Home.css';
import Faller from '../fallerComponent/Faller';
import Runner from '../runnerComponent/Runner';
import FlappyBlock from '../flappyComponent/FlappyBlock';
import MazeComponent from '../mazeComponent/MazeComponent';
import Evade from '../evadeComponent/evadeComponent';

export default class Home extends React.Component {
    private readonly faller: string = "faller";
    private readonly runner: string = "runner";
    private readonly flapper: string = "flapper";
    private readonly maze: string = "maze";
    
    constructor(props: any) {
        super(props);
        this.state = {
            gameType: this.faller
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
        else
            return <MazeComponent></MazeComponent>;
    }

    render() {
        return (
        <div className="Home">
            <div className=" game-container">
                <Evade></Evade>
                {/* {this.getGame()} */}
            </div>
            <div className="container-fluid menu-container">
              <div className="row">
                <div className="col mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.maze}>Maze</button></div>
                <div className="col mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.flapper}>Flapper</button></div>
                <div className="col mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.runner}>Runner</button></div>
                <div className="col mb-4"><button className="btn btn-outline-secondary" onClick={() => this.gameType = this.faller}>Faller</button></div>
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
