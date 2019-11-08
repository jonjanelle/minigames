import React from 'react';
import logo from './logo.svg';
import './App.css';
import MazeComponent from './mazeComponent/MazeComponent';
import FlappyBlock from './flappyComponent/FlappyBlock';
import Runner from './runnerComponent/Runner';
import Faller from './fallerComponent/Faller';
import { tsConstructorType } from '@babel/types';
import Home from './homeComponent/Home';
const App: React.FC = () => {


  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
