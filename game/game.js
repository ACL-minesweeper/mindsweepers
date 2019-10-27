import state from './state.js';
import { getArrayOfMineCoordinates } from './get-mines.js';
import { makeBoardArray } from './make-board-array.js';
import giveBoardArrayMines from './give-board-array-mines.js';
import giveBoardNumAdjMines from './give-board-numAdjMines.js';
import loadProfile from '../common/load-profile.js';
import { playGame } from './play-game.js';
import { clearAdjCells } from './clear-adj-cells.js';

// get DOM elements
const mainContainer = document.getElementById('main-container');
const userProfile = document.getElementById('profile-user-name');
const playAgainButton = document.getElementById('play-again-button');

// update DOM with user profile (in this case, just the user name)
const currentUser = loadProfile();
userProfile.textContent = currentUser.user;

// make blank conceptual board with numRows, numColumns, and an initialized cellObject in each cell
let boardArray = makeBoardArray(state.numRows, state.numColumns);

// cell currently clicked by user and will be updated on click
let clickedCell = [];


// sarah's function that we will use for the for loop
const createCell = id => {
    const newDiv = document.createElement('div');
    newDiv.id = id;
    // to remove all of the classes every time the board is set 
    newDiv.className = '';
    newDiv.classList.add('opacity');
    mainContainer.appendChild(newDiv);
    newDiv.addEventListener('click', cellClick);
};

//click handler function
export function cellClick(event) {
    const domCellId = event.target.id;
    const coordStringArr = domCellId.split(',');
    const coordNumberArr = coordStringArr.map(Number);
    clickedCell = coordNumberArr;
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
  //play game
        playGame(coordNumberArr, boardArray);
    }
}

//Part one of setting board: set up board for the first click.
export const setBlankBoard = boardArrayParam =>
    boardArrayParam.forEach(row =>
        row.forEach(cell =>
            createCell(cell.id)));

function initializeDreamBoardState(boardArrayParam, clickedCellParam) {
    const arrayOfMineCoordinates = getArrayOfMineCoordinates(
        state, boardArrayParam, clickedCellParam
    );
    giveBoardArrayMines(boardArrayParam, arrayOfMineCoordinates);
    giveBoardNumAdjMines(boardArrayParam, arrayOfMineCoordinates);
}

setBlankBoard(boardArray);

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
    const freshBoard = makeBoardArray(state.numRows, state.numColumns);

    // create a brand new DOM board
    setBlankBoard(freshBoard);
    boardArray = freshBoard; 
};

playAgainButton.addEventListener('click', () => playAgain(mainContainer));
