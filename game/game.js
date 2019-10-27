import state from './state.js';
import { getArrayOfMineCoordinates } from './get-mines.js';
import { makeBoardArray } from './make-board-array.js';
import giveBoardArrayMines from './give-board-array-mines.js';
import giveBoardNumAdjMines from './give-board-numAdjMines.js';
import { playGame } from './play-game.js';
import { clearAdjCells } from './clear-adj-cells.js';
import { getUser, returnHomeIfNoUser } from '../common/utils.js';

// get DOM elements
const mainContainer = document.getElementById('main-container');
const userProfile = document.getElementById('profile-user-name');
const playAgainButton = document.getElementById('play-again-button');

//updating DOM with user profile (in this case, just the user name)
const currentUser = getUser();
returnHomeIfNoUser(currentUser);
// if statement is needed here or there are console errors
if (currentUser) userProfile.textContent = currentUser.user;

//Part one of setting board: set up board for the first click.
const setBlankBoard = boardArrayParam =>
    boardArrayParam.forEach(row =>
        row.forEach(cell =>
            createCell(cell.id)));

const initializeDreamBoardState = (boardArrayParam, clickedCellParam) => {
    const arrayOfMineCoordinates = getArrayOfMineCoordinates(
        state,
        boardArrayParam,
        clickedCellParam
    );
    giveBoardArrayMines(boardArrayParam, arrayOfMineCoordinates);
    giveBoardNumAdjMines(boardArrayParam, arrayOfMineCoordinates);
};

//click handler function
export const cellClick = (event) => {
    const domCellId = event.target.id;
    const coordStringArr = domCellId.split(',');
    const clickedCell = coordStringArr.map(Number);
    if (state.firstClick) {
        // after the first click, board objects are updated with mines and numAdjines        
        initializeDreamBoardState(boardArray, clickedCell);
        state.firstClick = false;
        event.target.classList.remove('opacity');
        const firstCell = boardArray[clickedCell[0]][clickedCell[1]];
        firstCell.isHidden = false;

        const domCellId = firstCell.id;
        const coordStringArr = domCellId.split(',');
        const coordNumberArr = coordStringArr.map(Number);
        const clickedCellArray = coordNumberArr;
        clearAdjCells(clickedCellArray, boardArray);
    } else {
        playGame(clickedCell, boardArray);
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

let boardArray = makeBoardArray(state.numRows, state.numColumns);
setBlankBoard(boardArray);

state.flagsRemaining = state.numMines;

const playAgain = (mainContainerParam) => {
    // clear the board container so we can place a brand new board, strips 
    mainContainerParam.innerHTML = '';
    // reinitialize firstClick for user
    state.firstClick = true;
    // reset flags to full count which matches the number of mines
    state.flagsRemaining = state.numMines;
    state.userHasFlag = false; 
    const flagDiv = document.getElementById('flag-info');
    flagDiv.textContent = state.flagsRemaining;
    userProfile.textContent = currentUser.user;
    // create a brand new conceptual board
    boardArray = makeBoardArray(state.numRows, state.numColumns);
    // create a brand new DOM board
    setBlankBoard(boardArray);
};

playAgainButton.addEventListener('click', () => playAgain(mainContainer));
