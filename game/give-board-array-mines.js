// updates state boardArray with randomly generated mines
// seems like this could live in a file with some other functions
const giveBoardArrayMines = (minesArrayParam, stateParam) => {
    minesArrayParam.forEach(mine => {
        const mineRowCoordinate = mine[0];
        const mineColumnCoordinate = mine[1];
        stateParam.boardArray[mineRowCoordinate][mineColumnCoordinate].isMine = true;
    });
};

export default giveBoardArrayMines; 
