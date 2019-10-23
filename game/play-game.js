// import { flagsRemaining } from './game.js';
import { isWin, isLoss } from '../common/utils.js';
const flagDiv = document.getElementById('flag-div');
let userHasFlag = false;
flagDiv.addEventListener('click', () => {
    if (userHasFlag) userHasFlag = false;
    else if (!userHasFlag) userHasFlag = true;
});

// for MVP
let flagsRemaining = 10;
// Show user initial amount of flags
flagDiv.textContent = flagsRemaining;

// mine placement are known
export const playGame = (clickedCellLocationArr, boardArrParam) => {
    const objectRow = clickedCellLocationArr[0];
    const objectColumn = clickedCellLocationArr[1];
    const cellObject = boardArrParam[objectRow][objectColumn];
    const clickedCellId = clickedCellLocationArr[0] + ',' + clickedCellLocationArr[1];
    const domCell = document.getElementById(clickedCellId);
    if (cellObject.isFlagged) {
        cellObject.isFlagged = false;
        // update the DOM
        domCell.classList.add('opacity');
        domCell.classList.remove('flagged');
        flagsRemaining++;
        flagDiv.textContent = flagsRemaining;
    } else
    // if the user grabbed a flag
    if (userHasFlag) {
        // and the cell does not have a flag and the cell is still hidden
        if (!cellObject.isFlagged && cellObject.isHidden) {
            // then update the DOM
            domCell.classList.remove('opacity');
            domCell.classList.add('flagged');
            flagsRemaining--;
            flagDiv.textContent = flagsRemaining;
            cellObject.isFlagged = true;
            userHasFlag = false;
        }
    } else
    if (cellObject.isMine) {
        // this function needs to be created 
        gameOver();
    } else 
    if (cellObject.numAdjMines === 0) {
        // update the DOM
        domCell.classList.remove('opacity');
        cellObject.isHidden = false;
    } else {
        // populate the DOM with the number
        domCell.textContent = cellObject.numAdjMines;
        domCell.classList.remove('opacity');
        cellObject.isHidden = false;
    }
};

// playGame([1,1], fakeBoardArrParam);