// goal of this function is to take the board array (which is an array of an array of objects) and the mines array (which is a array of coordinate pair arrays) and update the one key/value pair in the object called isMine to true when there is a mine at that coordinate pair 

const giveBoardArrayMines = (boardArrayParam, minesArrayParam) => {
    minesArrayParam.forEach(mine => {
        const mineRowCoordinate = mine[0];
        const mineColumnCoordinate = mine[1];
        boardArrayParam[mineRowCoordinate][mineColumnCoordinate].isMine = true;
    });
};

export default giveBoardArrayMines; 