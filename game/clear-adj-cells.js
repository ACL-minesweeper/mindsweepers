import { getValidAdjCells } from '../common/utils.js';
import state from './state.js';

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
            const theme = localStorage.getItem('theme');
            cellObject = state.boardArray[cellRowIndex][cellColumnIndex];
            
            // get DOM cell div
            const domCell = document.getElementById(cellObject.id);
            if (theme === 'deep-space') domCell.style.backgroundColor = 'rgb(255, 90, 40)';
            // if numbered cell:
            if (cellObject.numAdjMines > 0){
                if (theme === 'dog-park') domCell.textContent = cellObject.numAdjMines;
                if (theme === 'deep-space'){
                    const green = 90 + cellObject.numAdjMines * 40;
                    domCell.style.backgroundColor = `rgb(255, ${green}, 40)`;
                }
                domCell.classList.remove('opacity');
                cellObject.isHidden = false;
                //clickAudio.play();
            }
            
            cellObject.isHidden = false;
            domCell.classList.remove('opacity');
            
            // potentially recurse
            if (!cellObject.clearAdjCellsCalled && cellObject.numAdjMines === 0) {
                clearAdjCells([cellRowIndex, cellColumnIndex]);
            }
        }
    });
};
