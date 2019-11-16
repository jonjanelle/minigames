import React from 'react';
import logo from './logo.svg';
import './MazeComponent.css';
import { MazeGame } from './models/MazeGame';

export default class MazeComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      date: new Date(),
      wins: 0
    };
  }

  componentDidMount() {
    let mazeGame = new MazeGame(20, "canvas");
    mazeGame.reset();
  }

  render() {
    return (
      <div className="canvas-container"> 
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}
