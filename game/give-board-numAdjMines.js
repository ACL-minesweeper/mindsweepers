import { getRows, getColumns } from '../common/utils.js';

const giveBoardNumAdjMines = (boardArray, minesArray) => {
    minesArray.forEach(mine => {
        const mineRow = mine[0]; 
        const mineColumn = mine[1]; 
        
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                const itIsItself = (i === 0 && j === 0);
                const cellRowIndex = mineRow + i; 
                const cellColumnIndex = mineColumn + j;
                const isValidRowIndex = checkValidRowIndex(cellRowIndex, boardArray);
                const isValidColumnIndex = checkValidColumnIndex(cellColumnIndex, boardArray);
                if (!itIsItself && isValidRowIndex && isValidColumnIndex) {
                    boardArray[cellRowIndex][cellColumnIndex].numAdjMines++;
                }
            }
        }
    });
};

export default giveBoardNumAdjMines; 
