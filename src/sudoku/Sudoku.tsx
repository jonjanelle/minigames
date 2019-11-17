import React from 'react';
import './sudoku.css';
import Puzzle from './Puzzle';
import PropTypes from 'prop-types';


export default class Sudoku extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            puzzle: new Puzzle()
        };
    
        this.onCellClick = this.onCellClick.bind(this);
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    onCellClick(block: number, cell: number) {
        this.puzzle.blocks[block].values[cell] = 1;
        this.setState({});
    }

    getCells() {
        let blocks = [];
        for (let j = 0; j < 9; j++) {
            let cells = [];
            for (let i = 0; i < 9; i++) {
                cells.push(
                    <div key={`cell-${j}-${i}`} className="sudoku-cell" onClick={() => this.onCellClick(j, i)}>
                        {this.puzzle.blocks[j].values[i]}
                    </div>
                );
            }
            blocks.push(
                <div key={`block-${j}`} className="sudoku-block">
                    {cells}
                </div>
            );
        }

        return blocks;
    }

    get puzzle(): Puzzle {
        return ((this.state as any).puzzle as Puzzle);
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