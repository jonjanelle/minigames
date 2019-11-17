import React from 'react';
import './sudoku.css';

export default class Sudoku extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="canvas-container"> 
                <canvas id="canvas"></canvas>
            </div>
        );
    }
}
