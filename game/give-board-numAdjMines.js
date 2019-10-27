import { getRows, getColumns } from '../common/utils.js'; 

export const isValidRowIndexFunc = (cellRowIndexParam, boardArrayParam) => {
    return (cellRowIndexParam >= 0 && cellRowIndexParam < getRows(boardArrayParam));
};

export const isValidColumnIndexFunc = (cellColumnIndexParam, boardArrayParam) => {
    return (cellColumnIndexParam >= 0 && cellColumnIndexParam < getColumns(boardArrayParam));
};

const giveBoardNumAdjMines = (boardArrayParam, minesArrayParam) => {
    minesArrayParam.forEach(mine => {
        const mineRow = mine[0]; 
        const mineColumn = mine[1]; 
        
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {

                const itIsItself = (i === 0 && j === 0);
                const cellRowIndex = mineRow + i; 
                const cellColumnIndex = mineColumn + j;
                const isValidRowIndex = isValidRowIndexFunc(cellRowIndex, boardArrayParam);
                const isValidColumnIndex = isValidColumnIndexFunc(cellColumnIndex, boardArrayParam);
                if (!itIsItself && isValidRowIndex && isValidColumnIndex) {
                    boardArrayParam[cellRowIndex][cellColumnIndex].numAdjMines++;
                }
            }
        }
    });
};

export default giveBoardNumAdjMines; 

