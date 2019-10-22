import { getArrayOfMineCoordinates } from './get-mines.js';
import { makeBoardArray } from './make-board-array.js';
import giveBoardArrayMines from './give-board-array-mines.js';
import giveBoardNumAdjMines from './give-board-numAdjMines.js';

//Get Dom elements
const mainContainer = document.getElementById('main-container');

const numRows = 8;
const numColumns = 8;

const boardArray = makeBoardArray(numRows, numColumns);

// sarah's function that we will use for the for loop
const createCell = id => {
    const newDiv = document.createElement('div');
    newDiv.id = id;
    newDiv.textContent = id;
    mainContainer.appendChild(newDiv);
    newDiv.addEventListener('click', () => {
        alert('you clicked here!');
        return mainContainer;
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
setBlankBoard(boardArray);
//Creating function that calls other functions to set up the board
// const setNewBoard = () => {};
