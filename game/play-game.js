// import { flagsRemaining } from './game.js';
import { firstClick, cellClick } from './game.js';
import { isWin, getUser, saveUser } from '../common/utils.js';


const flagDiv = document.getElementById('flag-info');
let userHasFlag = false;
flagDiv.addEventListener('click', () => {
    if (!firstClick){
        if (userHasFlag) userHasFlag = false;
        else if (!userHasFlag) userHasFlag = true;
    }
});

// for MVP
let flagsRemaining = 10;
// Show user initial amount of flags
flagDiv.textContent = flagsRemaining;
const image = document.createElement('img');
image.src = '../assests/placeholder-baggy.png';
image.id = 'bag';
image.alt = 'poop bag icon';
flagDiv.appendChild(image);

// mine placement are known
export const playGame = (clickedCellLocationArr, boardArrParam) => {
    const objectRow = clickedCellLocationArr[0];
    const objectColumn = clickedCellLocationArr[1];
    const cellObject = boardArrParam[objectRow][objectColumn];
    const clickedCellIdString = clickedCellLocationArr[0] + ',' + clickedCellLocationArr[1];
    const domCell = document.getElementById(clickedCellIdString);
    // remove a flag from a flagged cell
    if (cellObject.isFlagged) {
        cellObject.isFlagged = false;
    // update the DOM
        domCell.classList.add('opacity');
        domCell.classList.remove('flagged');
        flagsRemaining++;
        flagDiv.textContent = flagsRemaining;
    } 
    // if the user grabbed a flag
    else if (userHasFlag) {
        // and the cell does not have a flag and the cell is still hidden
        if (!cellObject.isFlagged && cellObject.isHidden) {
      // then update the DOM
            domCell.classList.remove('opacity');
            domCell.classList.add('flagged');
            flagsRemaining--;
            flagDiv.textContent = flagsRemaining;
            const image = document.createElement('img');
            image.src = '../assests/placeholder-baggy.png';
            image.id = 'bag';
            image.alt = 'poop bag icon';
            flagDiv.appendChild(image);
            cellObject.isFlagged = true;
            userHasFlag = false;
        }
    }
    else if (cellObject.isMine) {
        // execute loss sequence
        userWon(false, boardArrParam);
    } 
    else if (cellObject.numAdjMines === 0) {
        // update the DOM
        domCell.classList.remove('opacity');
        cellObject.isHidden = false;
    } else {
    // populate the DOM with the number
        domCell.textContent = cellObject.numAdjMines;
        domCell.classList.remove('opacity');
        cellObject.isHidden = false;
    }
    if (isWin()) {
        // execute win sequence
        userWon(true, boardArrParam);
    }
};

// update user win/loss record in local storage
const updateUserStats = (userObjParam, isWinParam) => {
    if (isWinParam) {
        userObjParam.wins++;
    } else {
        userObjParam.losses++;
    }
    // save updated user to local storage
    saveUser(userObjParam);
};

function userWon(userWonBoolean, boardArrParam) {
    boardArrParam.forEach(row => {
        row.forEach(cell => {
            // get the div element corresponding to the cell object 
            const divId = cell.id; 
            const divElement = document.getElementById(divId); 

            // prevent user from continuing game by removing the event listener for each cell
            divElement.removeEventListener('click', cellClick); 

            // if the cell is a mine and the game is over 
            if (cell.isMine) {
                // remove the hidden class to show the mines
                divElement.classList.remove('opacity');
            }
        });
    });

    //update local storage for win/loss count on the user object
    //get user object from local storage
    const userObj = getUser(); 
    //update win/loss count and save user object back to local storage
    updateUserStats(userObj, userWonBoolean);

    if (userWonBoolean) {
        alert('you WON!');
    } else {
        alert('you LOST!');
    }
}



