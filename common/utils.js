import state from '../game/state.js';

// this function returns an integer between 0 and n-1, where n is either the number of rows or the number of columns 
export const generateRandomIndex = lengthOfArray => Math.floor(Math.random() * lengthOfArray);

// save user to localStorage
export const saveUser = (user) => {
    const json = JSON.stringify(user);
    localStorage.setItem('user', json);
};

// get user from local storage
export const getUser = () => {
    const json = localStorage.getItem('user');
    if (!json) return null;
    const user = JSON.parse(json);
    return user;
};

// redirect to home page if user does not exist in local storage for some reason
// very cool util! could probably use !userParam instead of userParam === null
export const returnHomeIfNoUser = userParam => userParam === null && (window.location = '../');

// determine if user has won
export const isWin = () => {
    if (state.flagsRemaining === 0) {
        let winning = true;
        state.boardArray.forEach(row => {
            row.forEach(cell => {
                if (!cell.isMine && cell.isHidden) {
                    winning = false;
                }
            });
        });
        return winning;
    }
};

const checkValidRowIndex = (cellRowIndexParam) =>
    cellRowIndexParam >= 0 && cellRowIndexParam < state.numRows;

const checkValidColumnIndex = (cellColumnIndexParam) =>
    cellColumnIndexParam >= 0 && cellColumnIndexParam < state.numColumns;

// a default parameter!? wow!
export const getValidAdjCells = (cellArrayParam, includeSelfParam = false) => {
    const validAdjCells = [];
    const cellRow = cellArrayParam[0];
    const cellColumn = cellArrayParam[1];
    // a nested for loop?! wow!
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            // mark isItself false based on includeSelfParam if we want to include it in the returned array, i.e. when processing the first click
            // a ternary!? wow!
            const isItself = includeSelfParam ? false : (i === 0 && j === 0);
            const cellRowIndex = cellRow + i;
            const cellColumnIndex = cellColumn + j;
            const isValidRowIndex = checkValidRowIndex(cellRowIndex, state.boardArray);
            const isValidColumnIndex = checkValidColumnIndex(cellColumnIndex, state.boardArray);
            if (!isItself && isValidRowIndex && isValidColumnIndex) {
                validAdjCells.push([cellRowIndex, cellColumnIndex]);
            }
        }
    }
    return validAdjCells;
};

