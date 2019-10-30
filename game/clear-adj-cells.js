import { getValidAdjCells } from '../common/utils.js';
import state from './state.js';

// hopefully it goes without saying recursion waaaay impressive for a bootcamp-one project. It's truly amazing that y'all reached this difficult stretch goal!
export const clearAdjCells = (cellArrayParam) => {
    const cellRow = cellArrayParam[0];
    const cellColumn = cellArrayParam[1];
    // clear this cell
    let cellObject = state.boardArray[cellRow][cellColumn];
    cellObject.isHidden = false;
    const domObject = document.getElementById(cellObject.id);
    domObject.classList.remove('opacity');

    // record the fact that this cell has been operated on as the cellArray in a call of this function
    cellObject.clearAdjCellsCalled = true;

    // iterate around this cell
    getValidAdjCells(cellArrayParam).forEach(validCell => {
        const cellRowIndex = validCell[0];
        const cellColumnIndex = validCell[1];
        cellObject = state.boardArray[cellRowIndex][cellColumnIndex];
        if (!cellObject.isFlagged) {
            cellObject = state.boardArray[cellRowIndex][cellColumnIndex];

            // get DOM cell div
            const domCell = document.getElementById(cellObject.id);

            // if numbered cell:
            if (cellObject.numAdjMines > 0)
                domCell.textContent = cellObject.numAdjMines;

            cellObject.isHidden = false;
            domCell.classList.remove('opacity');

            // potentially recurse
            if (!cellObject.clearAdjCellsCalled && cellObject.numAdjMines === 0) {
                clearAdjCells([cellRowIndex, cellColumnIndex]);
            }
        }
    });
};
