import { getArrayOfMineCoordinates } from './get-mines.js';
import { makeBoardArray } from './make-board-array.js';
import giveBoardArrayMines from './give-board-array-mines.js';
import giveBoardNumAdjMines from './give-board-numAdjMines.js';

// get Dom elements
const mainContainer = document.getElementById('main-container');

// initialize variables
const numRows = 8;
const numColumns = 8;
const numMines = 10;
const boardArray = makeBoardArray(numRows, numColumns);
// always the cell currently clicked by user and will be updated anytime a user clicks a cell
let clickedCell = []; 
let firstClick = true;

// sarah's function that we will use for the for loop
const createCell = id => {
    const newDiv = document.createElement('div');
    newDiv.id = id;
    newDiv.textContent = id;
    mainContainer.appendChild(newDiv);
    newDiv.addEventListener('click', event => {
        const coordStringArr = event.target.id.split(',');
        const coordNumberArr = coordStringArr.map(Number);
        clickedCell = coordNumberArr;
        if (firstClick){
            // after the first click, board objects are updated with mines and numAdjMines
            initializeDreamBoardState(boardArray, clickedCell);
            firstClick = false;
        }
        else {
            //play game
        }
    });
};

//Part one of setting board: set up board for the first click.
const setBlankBoard = boardArray => {
    boardArray.forEach(row => {
        row.forEach(cell => {
            createCell(cell.id);
        });
    });
};

function initializeDreamBoardState(boardArray, clickedCell) {
    const arrayOfMineCoordinates = getArrayOfMineCoordinates(numMines, numRows, numColumns, clickedCell);
    giveBoardArrayMines(boardArray, arrayOfMineCoordinates);
    giveBoardNumAdjMines(boardArray, arrayOfMineCoordinates);
}

setBlankBoard(boardArray);
