import { makeBoardArray } from './make-board-array.js';
import { setBlankBoard, firstClick, flagsRemaining } from './game.js';




// clear the DOM board
const resetBoard = ({ mainContainerParam, numMinesParam, boardArrayParam, numRowsParam, numColumnsParam }) => {
    // clear the board container so we can place a brand new board
    mainContainerParam.innerHTML = '';
    // reinitialize firstClick for user
    firstClick = false;
    // reset flags to full count which matches the number of mines
    flagsRemaining = numMinesParam;
    // create a brand new conceptual board
    boardArrayParam = makeBoardArray(numRowsParam, numColumnsParam);
    // create a brand new DOM board
    setBlankBoard(boardArrayParam);
};

export const playAgain = ({ mainContainerParam, numMinesParam, boardArrayParam, numRowsParam, numColumnsParam }) => {
    resetBoard({ mainContainerParam, numMinesParam, boardArrayParam, numRowsParam, numColumnsParam });
};