// getRows function gets the number of rows 
// one of the rules is that the board will always be rectangular

export function getRows(boardArray) {
    return boardArray.length;
}

export function getColumns(boardArray) {
    const firstItem = boardArray[0];
    return firstItem.length;
}

// this function returns an integer between 0 and n-1, where n is either the number of rows or the number of columns 
export function generateRandomIndex(lengthOfArray) {
    const integer = Math.floor(Math.random() * lengthOfArray);
    return integer;
}

export function saveUser(user) {
    const json = JSON.stringify(user);
    localStorage.setItem('user', json);
}

export function getUser() {
    const json = localStorage.getItem('user');
    if (!json) return null;
    const user = JSON.parse(json);
    return user;
}

// called after each click (after first click) to check if bomb was in clicked cell object
export function isLoss(boardArrayParam, clickedCellCoordinatePairParam){
    if (boardArrayParam[clickedCellCoordinatePairParam[0]][clickedCellCoordinatePairParam[1]].isMine){
        return true;
    }
    else return false;   
}

export function isWin(boardArrayParam, numFlagsLeft){
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
}





