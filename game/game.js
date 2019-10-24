import { getArrayOfMineCoordinates } from './get-mines.js';
import { makeBoardArray } from './make-board-array.js';
import giveBoardArrayMines from './give-board-array-mines.js';
import giveBoardNumAdjMines from './give-board-numAdjMines.js';
import { playGame } from './play-game.js';
import loadProfile from '../common/load-profile.js';

// get DOM elements
const mainContainer = document.getElementById('main-container');
const userProfile = document.getElementById('profile-user-name');

//updating DOM with user profile (in this case, just the user name)
const currentUser = loadProfile();
userProfile.textContent = currentUser.user;

// initialize variables
const numRows = 8;
const numColumns = 8;
const numMines = 10;
const boardArray = makeBoardArray(numRows, numColumns);
// always the cell currently clicked by user and will be updated anytime a user clicks a cell
let clickedCell = [];
export let firstClick = true;
export let flagsRemaining = numMines;

// sarah's function that we will use for the for loop
const createCell = id => {
    const newDiv = document.createElement('div');
    newDiv.id = id;
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
    if (firstClick) {
  // after the first click, board objects are updated with mines and numAdjines
        initializeDreamBoardState(boardArray, clickedCell);
        firstClick = false;
        event.target.classList.remove('opacity');
        boardArray[clickedCell[0]][clickedCell[1]].isHidden = false;
    } else {
  //play game
        playGame(coordNumberArr, boardArray);
    }
}

//Part one of setting board: set up board for the first click.
export const setBlankBoard = boardArray => {
    boardArray.forEach(row => {
        row.forEach(cell => {
            createCell(cell.id);
        });
    });
};

function initializeDreamBoardState(boardArray, clickedCell) {
    const arrayOfMineCoordinates = getArrayOfMineCoordinates(
        numMines,
        numRows,
        numColumns,
        boardArray,
        clickedCell
    );
    giveBoardArrayMines(boardArray, arrayOfMineCoordinates);
    giveBoardNumAdjMines(boardArray, arrayOfMineCoordinates);
}

setBlankBoard(boardArray);
