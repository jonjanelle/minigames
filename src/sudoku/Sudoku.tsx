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

    getCells() {
        let blocks = [];
        for (let j = 0; j < 9; j++) {
            let cells = [];
            for (let i = 0; i < 9; i++) {
                cells.push(
                    <div key={`cell-${j}-${i}`} className="sudoku-cell">{i}</div>
                );
            }
            blocks.push(
                <div key={`block-${j}`}className="sudoku-block">
                    {cells}
                </div>
            );
        }

        return blocks;
    }

    render() {
        return (
            <div>
                <div className="sudoku-header">Sudoku</div>
                <div className="sudoku-container">
                    {this.getCells()} 
                </div>
            </div>
        );
    }
}
