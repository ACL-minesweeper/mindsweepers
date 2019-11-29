import { getArrayOfMineCoordinates } from './get-mines.js';
import giveBoardArrayMines from './give-board-array-mines.js';
import giveBoardNumAdjMines from './give-board-numAdjMines.js';

const state = {
    userHasFlag: false, 
    firstClick: true,
    clearAdjCellsCalled: false,

    initializeFlagsRemaining() {
        this.flagsRemaining = this.numMines;
    },

    // update state property of clickedCell with current click
    updateClickedCellArray(cellIdString) {
        const domCellId = cellIdString;
        const coordStringArr = domCellId.split(',');
        this.clickedCellArray = coordStringArr.map(Number);
    },

    // generates array of array of objects i.e. blank conceptual board
    initializeBlankBoardArray() {
        this.boardArray = [];
        for (let i = 0; i < this.numRows; i++) {
            const rowsArray = [];
            this.boardArray.push(rowsArray);
            for (let j = 0; j < this.numColumns; j++) {
                this.boardArray[i][j] = {};
                const cell = this.boardArray[i][j];
                cell.id = i + ',' + j;
                cell.row = i;
                cell.column = j;
                cell.isMine = false;
                cell.isHidden = true;
                cell.isFlagged = false;
                cell.numAdjMines = 0;
            }
        }
    },
    
    // populates board with mines and updates number of adjacent mines thus achieving the ultimate dream board state. 
    initializeDreamBoardArray() {
        const arrayOfMineCoordinates = getArrayOfMineCoordinates();
        giveBoardArrayMines(arrayOfMineCoordinates, state);
        giveBoardNumAdjMines(state.boardArray, arrayOfMineCoordinates);
    }
};

export default state;
