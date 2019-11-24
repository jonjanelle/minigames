import React from 'react';
import './sudoku.css';
import Puzzle from './Puzzle';
import PropTypes from 'prop-types';
import { Constants } from './Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faEdit } from '@fortawesome/free-solid-svg-icons'

export default class Sudoku extends React.Component {
    public get puzzle(): Puzzle { return ((this.state as any).puzzle as Puzzle); }
    public get selectedBlock(): number { return ((this.state as any).selectedBlock as number); }
    public get selectedCell(): number { return ((this.state as any).selectedCell as number); }
    public get isNoteMode(): boolean { return ((this.state as any).isNoteMode as boolean); }

    private readonly noteAction: string = 'note';

    constructor(props: any) {
        super(props);
        this.state = {
            puzzle: new Puzzle(),
            selectedBlock: -1,
            selectedCell: -1,
            isNoteMode: false
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
                if (this.isNoteMode) {
                    this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].addNote(+e.key);
                } else {
                    this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].setValue(+e.key);
                }
            } else if (e.key === 'c' || e.key === 'Backspace') {
                this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].setValue(0);
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

    public onControlClick(value: string): void {
        if (value === this.noteAction) {
            this.setState({isNoteMode: !this.isNoteMode});
        } else {
            if (this.isNoteMode) {
                if (value == '0') {
                    this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].setValue(0);
                } else {
                    this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].addNote(+value);
                }
            } else {
                this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].setValue(+value);
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

    private setSelectedCell(block: number, cell: number): void {
        if (this.selectedBlock >= 0 && this.selectedCell >= 0) {
            this.puzzle.blocks[this.selectedBlock].cells[this.selectedCell].isSelected = false;    
        }
        
        this.puzzle.blocks[block].cells[cell].isSelected = true;
        this.setState({selectedBlock: block, selectedCell: cell});
    }

    private getCellValue(blockN: number, cellN: number): string {
        let cell = this.puzzle.blocks[blockN].cells[cellN];
        if (cell.notes.length > 0) {
            return cell.notes.sort().join(', ');
        } else {
            return cell.value > 0 ? cell.value.toString() : '';
        }
    }


    public getCells(): JSX.Element[] {
        let blocks = [];
        for (let j = 0; j < 9; j++) {
            let cells: any = [];
            for (let i = 0; i < 9; i++) {
                let hasNotes = this.puzzle.blocks[j].cells[i].notes.length > 0;
                cells.push(
                    <div 
                        key={`cell-${j}-${i}`} 
                        className={"sudoku-cell" +  (this.puzzle.blocks[j].cells[i].isSelected ? " selected" : "")}
                        onClick={() => this.setSelectedCell(j, i)}>
                        <span className={hasNotes ? 'note-cell' : 'value-cell'}>
                            {this.getCellValue(j, i)}
                        </span>
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

    public getControls(): JSX.Element[]  {
        let valueButtons: any = [];
        let count = 0;
        for (let value of Constants.validValueStrings) {
            valueButtons.push(
                <button type="button" 
                        onClick={() => this.onControlClick(value)}
                        key={'button' + count}>
                    {value}
                </button>
            );
            count += 1;
        }

        valueButtons.push(
            <button type="button" 
                    className="icon-button" 
                    onClick={() => this.onControlClick('0')}
                    title="clear selected cell"
                    key={'button' + count}>
                <FontAwesomeIcon icon={faEraser} />
            </button>
        );

        count += 1;
        valueButtons.push(
            <button type="button" 
                    className={ `icon-button ${this.isNoteMode ? 'active-button' : ''}` } 
                    onClick={() => this.onControlClick(this.noteAction)}
                    title="toggle note mode"
                    key={'button' + count}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
        );

        return valueButtons;
    }

    public render(): JSX.Element {
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