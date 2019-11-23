import React from 'react';
import './sudoku.css';
import Puzzle from './Puzzle';
import PropTypes from 'prop-types';
import { Constants } from './Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faEdit } from '@fortawesome/free-solid-svg-icons'

export default class Sudoku extends React.Component {
    get puzzle(): Puzzle { return ((this.state as any).puzzle as Puzzle); }
    get selectedBlock(): number { return ((this.state as any).selectedBlock as number); }
    get selectedCell(): number { return ((this.state as any).selectedCell as number);}

    private readonly editAction: string = 'edit';

    constructor(props: any) {
        super(props);
        this.state = {
            puzzle: new Puzzle(),
            selectedBlock: -1,
            selectedCell: -1
        };
    
        this.setSelectedCell = this.setSelectedCell.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.onControlClick = this.onControlClick.bind(this);
    }

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    private addListeners(): void {
        window.addEventListener('keydown', this.checkInput, false);        
    }

    public removeListeners(): void {
        window.removeEventListener("keydown", this.checkInput);
    }

    public checkInput(e: KeyboardEvent): void {
        if (this.selectedBlock >= 0 && this.selectedCell >= 0) {
            if ((e.keyCode >= 49 && e.keyCode <= 57) || e.key in Constants.validValueStrings) {
                this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].value = +e.key;
            } else if (e.key === 'c' || e.key === 'Backspace') {
                this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].value = 0;
            } else if (e.key === "ArrowUp") {
                this.moveUp();
            } else if (e.key === "ArrowDown") {
                this.moveDown();
            } else if (e.key === "ArrowLeft") {
                this.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.moveRight();
            }
            
            this.setState({});
        }
    }

    private moveUp(): void {
        if (this.selectedBlock < 3 && this.selectedCell < 3) {
            return;
        }
        if (this.selectedCell < 3) {
            this.setSelectedCell(this.selectedBlock - 3, this.selectedCell + 6);
        } else {
            this.setSelectedCell(this.selectedBlock, this.selectedCell - 3);
        }
    }

    private moveDown(): void {
        if (this.selectedBlock >= 6 && this.selectedCell >= 6) {
            return;
        }
        if (this.selectedCell >= 6) {
            this.setSelectedCell(this.selectedBlock + 3, this.selectedCell - 6);
        } else {
            this.setSelectedCell(this.selectedBlock, this.selectedCell + 3);
        }
    }

    private moveRight(): void {
        if (this.selectedBlock % 3 === 2 && this.selectedCell % 3 === 2) {
            return;
        }
        if (this.selectedCell % 3 === 2) {
            this.setSelectedCell(this.selectedBlock + 1, this.selectedCell - 2);
        } else {
            this.setSelectedCell(this.selectedBlock, this.selectedCell + 1);
        }
    }

    private moveLeft(): void {
        if (this.selectedBlock % 3 === 0 && this.selectedCell % 3 === 0) {
            return;
        }
        if (this.selectedCell % 3 === 0) {
            this.setSelectedCell(this.selectedBlock - 1, this.selectedCell + 2);
        } else {
            this.setSelectedCell(this.selectedBlock, this.selectedCell - 1);
        }
    }

    setSelectedCell(block: number, cell: number) {
        if (this.selectedBlock >= 0 && this.selectedCell >= 0) {
            this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].isSelected = false;    
        }
        
        this.puzzle.blocks[block].cells[cell].isSelected = true;
        this.setState({selectedBlock: block, selectedCell: cell});
    }

    getCells() {
        let blocks = [];
        for (let j = 0; j < 9; j++) {
            let cells: any = [];
            for (let i = 0; i < 9; i++) {
                let value = this.puzzle.blocks[j].cells[i].value;
                cells.push(
                    <div 
                        key={`cell-${j}-${i}`} 
                        className={"sudoku-cell" +  (this.puzzle.blocks[j].cells[i].isSelected ? " selected" : "")}
                        onClick={() => this.setSelectedCell(j, i)}>
                        { value > 0 ? value : ''}
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

    getControls() {
        let valueButtons: any = [];
        for (let value of Constants.validValueStrings) {
            valueButtons.push(
                <button type="button" onClick={() => this.onControlClick(value)}>{value}</button>
            );
        }

        valueButtons.push(
            <button type="button" className="icon-button" onClick={() => this.onControlClick('0')}>
                 <FontAwesomeIcon icon={faEraser} />
            </button>
        );
        valueButtons.push(
            <button type="button" className="icon-button" onClick={() => this.onControlClick(this.editAction)}>
                 <FontAwesomeIcon icon={faEdit} />
            </button>
        );

        return valueButtons;
    }

    onControlClick(value: string): void {
        if (value === this.editAction) {
            alert('hi');
        } else {
            this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].value = +value;
        }

        this.setState({});
    }

    render() {
        return (
            <div>
                <div className="sudoku-header">Sudoku</div>
                <div className="sudoku-container">
                    {this.getCells()}
                   
                </div>
                <div className="player-controls">
                    {this.getControls()}
                </div>
            </div>
        );
    }
}