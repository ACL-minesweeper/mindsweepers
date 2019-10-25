import { isValidRowIndexFunc, isValidColumnIndexFunc } from './give-board-numAdjMines.js';

export const clearAdjCells = (cellArray, boardArrayParam) => {
    const cellRow = cellArray[0];
    const cellColumn = cellArray[1];
    // clear this cell
    let cellObject = boardArrayParam[cellRow][cellColumn];
    cellObject.isHidden = false;
    document.getElementById(cellObject.id).classList.remove('opacity');
    
    // record the fact that this cell has been operated on as the cellArray in a call of this function
    cellObject.clearAdjCells = true;

    // iterate around this cell
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const itIsItself = (i === 0 && j === 0);
            const cellRowIndex = cellRow + i; 
            const cellColumnIndex = cellColumn + j;
            const isValidRowIndex = isValidRowIndexFunc(cellRowIndex, boardArrayParam);
            const isValidColumnIndex = isValidColumnIndexFunc(cellColumnIndex, boardArrayParam);
            if (!itIsItself && isValidRowIndex && isValidColumnIndex && !cellObject.isFlagged) {
                cellObject = boardArrayParam[cellRowIndex][cellColumnIndex];
                
                // get DOM cell div
                const domCell = document.getElementById(cellObject.id);

                // if numbered cell:
                if (cellObject.numAdjMines > 0)
                    domCell.textContent = cellObject.numAdjMines;
                
                cellObject.isHidden = false;
                domCell.classList.remove('opacity');
                
                // potentially recurse
                if (!cellObject.clearAdjCells && cellObject.numAdjMines === 0) {
                    clearAdjCells([cellRowIndex, cellColumnIndex], boardArrayParam);
                }
            }
        }
    }
};
