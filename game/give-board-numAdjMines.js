import { getRows, getColumns } from '../common/utils.js'; 

const giveBoardNumAdjMines = (boardArray, minesArray) => {

    const minesArrayRow = minesArray[0]; 
    const minesArrayColumn = minesArray[1]; 
    
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            const itIsItself = (i === 0 && j === 0);
            const cellRowIndex = minesArrayRow + i; 
            const cellColumnIndex = minesArrayColumn + j;

            const isValidRowIndex = cellRowIndex > 0 && cellRowIndex < getRows(); 
            const isValidColumnIndex = cellColumnIndex > 0 && cellColumnIndex < getColumns(); 

            // if the coordinate pair is not the mine index value itself AND has index values that are inside the board, update the numAdjMines by 1 on the cell object 
            if (!itIsItself && isValidRowIndex && isValidColumnIndex) {
                boardArray[cellRowIndex][cellColumnIndex].numAdjMines++; 
            }
        }
    }
};

export default giveBoardNumAdjMines; 


