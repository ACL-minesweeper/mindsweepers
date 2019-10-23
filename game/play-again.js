import { makeBoardArray } from './make-board-array.js';
import { setBlankBoard, firstClick, flagsRemaining } from './game.js';
import { saveUser } from '../common/utils.js';

// update user win/loss record in local storage
const updateUserStats = ({ userObjParam, isWinParam, isLossParam }) => {
    // add a win if they won
    userObjParam.wins += isWinParam;
    // add a loss if they lost
    userObjParam.losses += isLossParam;
    // save updated user to local storage
    saveUser(userObjParam);
};

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

export const playAgain = ({ userObjParam, isWinParam, isLossParam, mainContainerParam, numMinesParam, boardArrayParam, numRowsParam, numColumnsParam }) => {
    updateUserStats({ userObjParam, isWinParam, isLossParam });
    resetBoard({ mainContainerParam, numMinesParam, boardArrayParam, numRowsParam, numColumnsParam });
};