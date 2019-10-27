import { getValidAdjCells } from '../common/utils.js';

export const clearAdjCells = (cellArrayParam, boardArrayParam) => {
    const cellRow = cellArrayParam[0];
    const cellColumn = cellArrayParam[1];
    // clear this cell
    let cellObject = boardArrayParam[cellRow][cellColumn];
    cellObject.isHidden = false;
    const domObject = document.getElementById(cellObject.id);
    domObject.classList.remove('opacity');
    
    // record the fact that this cell has been operated on as the cellArray in a call of this function
    cellObject.clearAdjCellsCalled = true;

    // iterate around this cell
    getValidAdjCells(cellArrayParam, boardArrayParam).forEach(validCell => {
        const cellRowIndex = validCell[0];
        const cellColumnIndex = validCell[1];
        if (!cellObject.isFlagged) {
            cellObject = boardArrayParam[cellRowIndex][cellColumnIndex];
            
            // get DOM cell div
            const domCell = document.getElementById(cellObject.id);

            // if numbered cell:
            if (cellObject.numAdjMines > 0)
                domCell.textContent = cellObject.numAdjMines;
            
            cellObject.isHidden = false;
            domCell.classList.remove('opacity');
            
            // potentially recurse
            if (!cellObject.clearAdjCellsCalled && cellObject.numAdjMines === 0) {
                clearAdjCells([cellRowIndex, cellColumnIndex], boardArrayParam);
            }
        }
    });
};
