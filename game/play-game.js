// for testing purposes
const flagDiv = document.getElementById('flag-div');
let userFlags = 10;
let userHasFlag = false;
flagDiv.addEventListener('click', () => {
    if (userHasFlag) userHasFlag = false;
    else if (!userHasFlag) userHasFlag = true
});

// bomb placement are know
export const playGame = (clickedCellLocationArr, boardArrParam) => {
    console.log('in playGame');
    const objectRow = clickedCellLocationArr[0];
    const objectColumn = clickedCellLocationArr[1];
    const cellObject = boardArrParam[objectRow][objectColumn];
    const clickedCellId = clickedCellLocationArr[0] + ',' + clickedCellLocationArr[1];
    const domCell = document.getElementById(clickedCellId);
    if (cellObject.isFlagged) {
        cellObject.isFlagged = false;
        // update the DOM
        domCell.classList.remove('flagged');
    } else
    // if the user grabbed a flag
    if (userHasFlag) {
        // and the cell does not have a flag and the cell is still hidden
        if (!cellObject.isFlagged && cellObject.isHidden) {
            // then update the DOM
            domCell.classList.remove('opacity');
            domCell.classList.add('flagged');
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
        cellObject.isHidden = false;
    }
};

// playGame([1,1], fakeBoardArrParam);