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
                const isValidRowIndex = cellRowIndex >= 0 && cellRowIndex < getRows(boardArray); 
                const isValidColumnIndex = cellColumnIndex >= 0 && cellColumnIndex < getColumns(boardArray); 
                // if the coordinate pair is not the mine index value itself AND has index values that are inside the board, update the numAdjMines by 1 on the cell object 
                if (!itIsItself && isValidRowIndex && isValidColumnIndex) {
                    boardArray[cellRowIndex][cellColumnIndex].numAdjMines++; 
                }
            }
        }
    });
};

export default giveBoardNumAdjMines; 


