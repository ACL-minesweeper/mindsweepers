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
export const returnHomeIfNoUser = userParam => userParam === null && (window.location = '../');

// determine if user has won
export const isWin = (boardArrayParam, numFlagsLeft) => {
    if (numFlagsLeft === 0){
        let winning = true;
        boardArrayParam.forEach(row => {
            row.forEach(cell => {
                if (!cell.isMine && cell.isHidden){
                    winning = false;
                }
            });
        });
        return winning;
    }
};

const checkValidRowIndex = (cellRowIndexParam, boardArrayParam) =>
    cellRowIndexParam >= 0 && cellRowIndexParam < getRows(boardArrayParam);

const checkValidColumnIndex = (cellColumnIndexParam, boardArrayParam) =>
    cellColumnIndexParam >= 0 && cellColumnIndexParam < getColumns(boardArrayParam);

export const getValidAdjCells = (cellCoordinatePairArrayParam, boardArrayParam, includeSelfParam = false) => {
    const validAdjCells = [];
    const cellRow = cellCoordinatePairArrayParam[0];
    const cellColumn = cellCoordinatePairArrayParam[1];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            // mark isItself false based on includeSelfParam if we want to include it in the returned array, i.e. when processing the first click
            const isItself = includeSelfParam ? false : (i === 0 && j === 0);
            const cellRowIndex = cellRow + i; 
            const cellColumnIndex = cellColumn + j;
            const isValidRowIndex = checkValidRowIndex(cellRowIndex, boardArrayParam);
            const isValidColumnIndex = checkValidColumnIndex(cellColumnIndex, boardArrayParam);
            if (!isItself && isValidRowIndex && isValidColumnIndex) {
                validAdjCells.push([cellRowIndex, cellColumnIndex]);
            }
        }
    }
    return validAdjCells;
};

// used in test
export const getRows = boardArray => boardArray.length;

//used in test
export const getColumns = boardArray => boardArray[0].length;
