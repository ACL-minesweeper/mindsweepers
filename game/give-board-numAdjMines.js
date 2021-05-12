import { getValidAdjCells } from '../common/utils.js';
// seems like this could live in a file with some other functions

const giveBoardNumAdjMines = (boardArrayParam, minesArrayParam) =>
    minesArrayParam.forEach(mine =>
        getValidAdjCells(mine).forEach(validCell => {
            const mineRow = validCell[0];
            const mineColumn = validCell[1];
            boardArrayParam[mineRow][mineColumn].numAdjMines++;
        }));

export default giveBoardNumAdjMines; 
