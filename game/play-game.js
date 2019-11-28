import state from './state.js';
import { cellClick } from './game.js';
import { isWin, getUser, saveUser } from '../common/utils.js';
import { clearAdjCells } from './clear-adj-cells.js';
import { holdFlag, placeFlag, dropFlag, tripMine, recursion, gameWin, clickAudio } from '../assets/sounds.js';   

import { timerInterval } from './game.js';
let theme = localStorage.getItem('theme');

// populate flag info header
const flagDiv = document.getElementById('flag-info');
flagDiv.classList.add('flag-pre-click');
let userHasFlag = false;
flagDiv.addEventListener('click', () => {
    if (!state.firstClick) {
        if (!userHasFlag) {
            userHasFlag = true;
            holdFlag.play();
            flagDiv.classList.remove('flag-pre-click');
            flagDiv.classList.add('flag-post-click');
        }
        else {
            userHasFlag = false;
            dropFlag.play();
            flagDiv.classList.remove('flag-post-click');
            flagDiv.classList.add('flag-pre-click');
        }
    }
});
// initialize flags remaining and display to user
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
        dropFlag.play();
        state.flagsRemaining++;
        // update the DOM
        domCell.classList.add('opacity');
        domCell.classList.remove('flagged');
        flagDiv.textContent = state.flagsRemaining;
    }
    // if the user grabbed a flag
    else if (userHasFlag) {
        if (!cellObject.isFlagged && cellObject.isHidden) {
            cellObject.isFlagged = true;
            state.flagsRemaining--;
            userHasFlag = false;
            placeFlag.play();
            // then update the DOM
            domCell.classList.remove('opacity');
            domCell.classList.add('flagged');
            flagDiv.classList.remove('flag-post-click');
            flagDiv.classList.add('flag-pre-click');
            flagDiv.textContent = state.flagsRemaining;
        }
    }
    // if the user clicks a mine
    else if (cellObject.isMine) {
        // execute loss sequence
        tripMine.play();
        clearInterval(timerInterval);
        userWon(false, state.boardArray);
    }
    // if the user clicks a cell with adjacent mines
    else if (cellObject.numAdjMines > 0) {
        // populate the DOM with the number
        if (theme === 'dog-park') domCell.textContent = cellObject.numAdjMines;

        // optionally add background color (for deep space theme)
        if (theme === 'deep-space'){
            const green = 90 + cellObject.numAdjMines * 40;
            domCell.style.backgroundColor = `rgb(255, ${green}, 40)`;
        }
        domCell.classList.remove('opacity');
        cellObject.isHidden = false;
        clickAudio.play();
    }
    // if the user clicks an empty cell
    else if (cellObject.numAdjMines === 0) {
        if (theme === 'deep-space') domCell.style.backgroundColor = 'rgb(255, 90, 40)';
        // update the DOM
        recursion.play();
        const domCellId = cellObject.id;
        const coordStringArr = domCellId.split(',');
        const coordNumberArr = coordStringArr.map(Number);
        const clickedCellArray = coordNumberArr;
        clearAdjCells(clickedCellArray);
    }
    if (isWin()) {
        // execute win sequence
        gameWin.play();
        clearInterval(timerInterval);
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
                if (theme === 'dog-park') divElement.style.backgroundImage = "url('../assets/dog-park/bomb.png')";
                if (theme === 'deep-space') divElement.style.backgroundImage = "url('../assets/deep-space/bomb.png')";
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
        state.boardArray.forEach((rowObj, i) =>
            rowObj.forEach((cellObj, j) => {
                const divClearDelay = 40 + 40 * i * j;
                const thisDiv = document.getElementById(cellObj.id);
                thisDiv.className = 'end-win-div';
                window.setTimeout(() => {
                    thisDiv.className = '';
                    thisDiv.textContent = '';
                    thisDiv.innerHTML = '';
                }, divClearDelay);
            }));
        const theMainContainer = document.getElementById('main-container');
        window.setTimeout(() => theMainContainer.innerHTML = '', 2560);
    } else {
        userProfile.textContent = currentUser.user + ' you lost!';
    }
}
