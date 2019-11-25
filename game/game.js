import state from './state.js';
import './board-specs.js';
import { boardSpecs } from './board-specs.js';
import { playGame } from './play-game.js';
import { clearAdjCells } from './clear-adj-cells.js';
import { getUser, returnHomeIfNoUser } from '../common/utils.js';

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
