import state from '../game/state.js';

// this function returns an integer between 0 and n-1, where n is either the number of rows or the number of columns 
export const generateRandomIndex = lengthOfArray => Math.floor(Math.random() * lengthOfArray);

// determine if user has won
export const isWin = () => {
    if (state.flagsRemaining !== 0) return false;
    else
        for (let row = 0; row < state.boardArray.length; row++) 
            for (let cell = 0; cell < row.length; cell++)
                if (!cell.isMine && cell.isHidden)
                    return false;
    return true;
};

const checkValidRowIndex = cellRowIndexParam =>
    cellRowIndexParam >= 0 && cellRowIndexParam < state.numRows;

const checkValidColumnIndex = cellColumnIndexParam =>
    cellColumnIndexParam >= 0 && cellColumnIndexParam < state.numColumns;

export const getValidAdjCells = (cellArrayParam, includeSelfParam = false) => {
    const validAdjCells = [];
    const cellRow = cellArrayParam[0];
    const cellColumn = cellArrayParam[1];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            // mark isItself false based on includeSelfParam if we want to include it in the returned array, i.e. when processing the first click
            const isItself = includeSelfParam ? false : (i === 0 && j === 0);
            const cellRowIndex = cellRow + i; 
            const cellColumnIndex = cellColumn + j;
            const isValidRowIndex = checkValidRowIndex(cellRowIndex);
            const isValidColumnIndex = checkValidColumnIndex(cellColumnIndex);
            if (!isItself && isValidRowIndex && isValidColumnIndex) {
                validAdjCells.push([cellRowIndex, cellColumnIndex]);
            }
        }
    }
    return validAdjCells;
};
