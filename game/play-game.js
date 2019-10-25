import state from './state.js';
import { cellClick } from './game.js';
import { isWin, getUser, saveUser } from '../common/utils.js';
import loadProfile from '../common/load-profile.js';
import { clearAdjCells } from './clear-adj-cells.js';


const flagDiv = document.getElementById('flag-info');
flagDiv.classList.add('flag-pre-click');
let userHasFlag = false;
flagDiv.addEventListener('click', () => {
    if (!state.firstClick){
        if (userHasFlag) userHasFlag = false;
        else if (!userHasFlag) userHasFlag = true;

        flagDiv.classList.remove('flag-pre-click');
        flagDiv.classList.add('flag-post-click');
    }
});


// Show user initial amount of flags
flagDiv.textContent = state.flagsRemaining;

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
        state.flagsRemaining++;
        flagDiv.textContent = state.flagsRemaining;
    } 
    // if the user grabbed a flag
    else if (userHasFlag) {
        if (!cellObject.isFlagged && cellObject.isHidden) {
            // then update the DOM
            domCell.classList.remove('opacity');
            domCell.classList.add('flagged');
            flagDiv.classList.remove('flag-post-click');
            flagDiv.classList.add('flag-pre-click');
            state.flagsRemaining--;
            flagDiv.textContent = state.flagsRemaining;
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
        const domCellId = cellObject.id;
        const coordStringArr = domCellId.split(',');
        const coordNumberArr = coordStringArr.map(Number);
        const clickedCellArray = coordNumberArr;

        clearAdjCells(clickedCellArray, boardArrParam);
    } else {
    // populate the DOM with the number
        domCell.textContent = cellObject.numAdjMines;
        domCell.classList.remove('opacity');
        cellObject.isHidden = false;
    }
    if (isWin(boardArrParam, state.flagsRemaining)) {
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
                //show the user the mine image
                divElement.classList.add('mine');
            }
        });
    });

    //update local storage for win/loss count on the user object
    //get user object from local storage
    const userObj = getUser(); 
    //update win/loss count and save user object back to local storage
    updateUserStats(userObj, userWonBoolean);

    const userProfile = document.getElementById('profile-user-name');
    const currentUser = loadProfile();

    if (userWonBoolean) {
        userProfile.textContent = currentUser.user + ' you won!';
        const background = document.getElementById('main-container');
        background.innerHTML = '';
    } else {
        userProfile.textContent = currentUser.user + ' you lost!';
    }
}



