import React from 'react';
import './sudoku.css';
import Puzzle from './Puzzle';
import PropTypes from 'prop-types';


export default class Sudoku extends React.Component {
    private readonly numberKeyString: string[] = ["1", "2", "3", "4", "5", "6", "7" ,"8" ,"9"];
    constructor(props: any) {
        super(props);
        this.state = {
            puzzle: new Puzzle(),
            selectedBlock: -1,
            selectedCell: -1
        };
    
        this.onCellClick = this.onCellClick.bind(this);
        this.checkInput = this.checkInput.bind(this);
    }

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    private addListeners(): void {
        window.addEventListener('keyup', this.checkInput, false);        
    }

    public removeListeners(): void {
        window.removeEventListener("keyup", this.checkInput);
    }

    public checkInput(e: KeyboardEvent): void {
        if (this.selectedBlock >= 0 && this.selectedCell >= 0) {
            if ((e.keyCode >= 49 && e.keyCode <= 57) || e.key in this.numberKeyString) {
                this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].value = +e.key;
            } else if (e.key === "ArrowUp") {

            } else if (e.key === "ArrowDown") {

            } else if (e.key === "ArrowLeft") {

            } else if (e.key === "ArrowRight") {

            }
        }
        this.setState({});
    }

    onCellClick(block: number, cell: number) {
        if (this.selectedBlock >= 0 && this.selectedCell >= 0) {
            this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].isSelected = false;    
        }
        
        this.puzzle.blocks[block].cells[cell].isSelected = true;
        this.setState({selectedBlock: block, selectedCell: cell});
    }

    getCells() {
        let blocks = [];
        for (let j = 0; j < 9; j++) {
            let cells = [];
            for (let i = 0; i < 9; i++) {
                cells.push(
                    <div 
                        key={`cell-${j}-${i}`} 
                        className={"sudoku-cell" +  (this.puzzle.blocks[j].cells[i].isSelected ? " selected" : "")}
                        onClick={() => this.onCellClick(j, i)}>
                        {this.puzzle.blocks[j].cells[i].value}
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

    get selectedBlock(): number {
        return ((this.state as any).selectedBlock as number);
    }

    get selectedCell(): number {
        return ((this.state as any).selectedCell as number);
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