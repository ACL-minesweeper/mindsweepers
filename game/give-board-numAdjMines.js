import { getValidAdjCells } from '../common/utils.js';

const giveBoardNumAdjMines = (boardArrayParam, minesArrayParam) =>
    minesArrayParam.forEach(mine =>
        getValidAdjCells(mine).forEach(validCell => {
            const mineRow = validCell[0];
            const mineColumn = validCell[1];
            boardArrayParam[mineRow][mineColumn].numAdjMines++;
        }));

export default giveBoardNumAdjMines; 
