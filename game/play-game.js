import state from './state.js';
// import './board-specs.js';
import { boardSpecs } from './board-specs.js';
import { isWin, getUser, saveUser, returnHomeIfNoUser } from '../common/utils.js';
import { clearAdjCells } from './clear-adj-cells.js';
import { holdFlag, placeFlag, dropFlag, tripMine, recursion, gameWin, clickAudio } from '../assets/sounds.js';   

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
//state.initializeFlagsRemaining();
flagDiv.textContent = state.flagsRemaining;

// mine placements are known at this point
export const playGame = () => {
    const objectRow = state.clickedCellArray[0];
    const objectColumn = state.clickedCellArray[1];
    const cellObject = state.boardArray[objectRow][objectColumn];
    console.log('isHidden', cellObject.isHidden);
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
        domCell.textContent = cellObject.numAdjMines;
        domCell.classList.remove('opacity');
        cellObject.isHidden = false;
        clickAudio.play();
    }
    // if the user clicks an empty cell
    else if (cellObject.numAdjMines === 0) {
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

// get DOM elements
const mainContainer = document.getElementById('main-container');
const userProfile = document.getElementById('profile-user-name');
const timerDiv = document.getElementById('timer');
const playAgainButton = document.getElementById('play-again-button');

//updating DOM with user profile (in this case, just the user name)
const currentUser = getUser();
returnHomeIfNoUser(currentUser);
// prevent console errors
if (currentUser) userProfile.textContent = currentUser.user;

export let timerInterval;

const boardDimension = boardSpecs.boardDimension[localStorage.getItem('board-size')];
mainContainer.style.setProperty('--numRows', boardDimension);
mainContainer.style.setProperty('--numColumns', boardDimension);

const setBlankBoard = () => {
    state.boardArray.forEach(row =>
        row.forEach(cell =>
            createCell(cell.id)));
};

export const incrementTimeDiv = timerInterval => {
    const currentTime = +timerDiv.textContent;
    timerDiv.textContent = (currentTime + 1).toString().padStart(3, '0');
    if (currentTime >= 998) clearInterval(timerInterval.id);
};

// handles user click if firstClick and otherwise
export const cellClick = event => {
    state.updateClickedCellArray(event.target.id);
    if (state.firstClick) {
        // after the first click, board objects are updated with mines and numAdjines   
        state.initializeDreamBoardArray();
        state.firstClick = false;
        event.target.classList.remove('opacity');
        state.boardArray[state.clickedCellArray[0]][state.clickedCellArray[1]].isHidden = false;
        //state.updateClickedCellArray(firstCell.id);
        clearAdjCells(state.clickedCellArray);
        timerInterval = setInterval(() => incrementTimeDiv(timerInterval.id), 1000);
    } else {
        playGame();
    }
};

// create DOM cell div elements
const createCell = id => {
    const newDiv = document.createElement('div');
    newDiv.id = id;
    // to remove all of the classes every time the board is set 
    newDiv.className = '';
    newDiv.classList.add('opacity');
    mainContainer.appendChild(newDiv);
    newDiv.addEventListener('click', cellClick);
};
// initialize blank conceptual board, initialize flagsRemaining, and setup board for first click
state.initializeBlankBoardArray();
//state.initializeFlagsRemaining();
setBlankBoard();

const playAgain = mainContainerParam => {
    // clear the board container so we can place a brand new board, strips 
    mainContainerParam.innerHTML = '';
    // reinitialize firstClick for user
    state.firstClick = true;
    // reset timerDiv text
    clearInterval(timerInterval);
    timerDiv.textContent = '000';
    // reset flags to full count which matches the number of mines
    state.initializeFlagsRemaining();
    state.userHasFlag = false; 
    const flagDiv = document.getElementById('flag-info');
    flagDiv.textContent = state.flagsRemaining;
    flagDiv.className = 'flag-pre-click';
    userProfile.textContent = currentUser.user;
    // create a brand new conceptual board
    state.initializeBlankBoardArray();
    // create a brand new DOM board
    setBlankBoard(state.boardArray);
};

playAgainButton.addEventListener('click', () => playAgain(mainContainer));
