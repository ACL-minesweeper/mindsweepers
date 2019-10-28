import state from './state.js';
import { cellClick } from './game.js';
import { isWin, getUser, saveUser } from '../common/utils.js';
import { clearAdjCells } from './clear-adj-cells.js';

// populate flag info header
const flagDiv = document.getElementById('flag-info');
flagDiv.classList.add('flag-pre-click');
let userHasFlag = false;
flagDiv.addEventListener('click', () => {
    if (!state.firstClick) {
        if (!userHasFlag) {
            userHasFlag = true;
            flagDiv.classList.remove('flag-pre-click');
            flagDiv.classList.add('flag-post-click');
        }
        else {
            userHasFlag = false;
            flagDiv.classList.remove('flag-post-click');
            flagDiv.classList.add('flag-pre-click');
        }
    }
});
// initialize flags remaining and display to user
state.initializeFlagsRemaining();
flagDiv.textContent = state.flagsRemaining;

// mine placements are known at this point
export const playGame = () => {
    const objectRow = state.clickedCellArray[0];
    const objectColumn = state.clickedCellArray[1];
    const cellObject = state.boardArray[objectRow][objectColumn];
    const clickedCellIdString = state.clickedCellArray[0] + ',' + state.clickedCellArray[1];
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
        userWon(false, state.boardArray);
    } 
    else if (cellObject.numAdjMines === 0) {
        // update the DOM
        const domCellId = cellObject.id;
        const coordStringArr = domCellId.split(',');
        const coordNumberArr = coordStringArr.map(Number);
        const clickedCellArray = coordNumberArr;

        clearAdjCells(clickedCellArray,);
    } else {
        // populate the DOM with the number
        domCell.textContent = cellObject.numAdjMines;
        domCell.classList.remove('opacity');
        cellObject.isHidden = false;
    }
    if (isWin()) {
        // execute win sequence
        userWon(true);
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

function userWon(userWonBoolean) {
    state.boardArray.forEach(row => {
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
    const currentUser = getUser();
 
    if (userWonBoolean) {
        userProfile.textContent = currentUser.user + ' you won!';
        state.boardArray.forEach(rowObj => 
            rowObj.forEach(cellObj =>
                window.setTimeout(() => {
                    const thisDiv = document.getElementById(cellObj.id);
                    thisDiv.className = '';
                    thisDiv.textContent = '';
                    thisDiv.innerHTML = '';
                }, 1000)));
        const theMainContainer = document.getElementById('main-container');
        window.setTimeout(() => 
            theMainContainer.innerHTML = '', 1000);
    } else {
        userProfile.textContent = currentUser.user + ' you lost!';
    }
}
