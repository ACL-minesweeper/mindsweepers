// for testing purposes
const userHasFlag = true;
const fakeBoardArrParam = [{
    id: '1,1',
    row: 1,
    column: 1,
    isMine: false,
    isHidden: false,
    isFlagged: false,
    numAdjMines: 3,
}];

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
    if (userHasFlag) {
        cellObject.isFlagged = true;
        // update the DOM
        domCell.classList.add('flagged');
    } else
    if (cellObject.isMine) {
        // this function needs to be created 
        gameOver();
    } else 
    if (cellObject.numAdjMines === 0) {
        // update the DOM
        domCell.classList.remove('opacity');
    } else {
        // populate the DOM with the number
        domCell.textContent = cellObject.numAdjMines;
    }
};

// playGame([1,1], fakeBoardArrParam);