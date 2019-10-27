
// makes conceptual board (array of rows of array of columns of cell objects)
export function makeBoardArray(numRowsParam, numColumnsParam) {
    const board = []; 
    for (let i = 0; i < numRowsParam; i++) {
        const rowsArray = [];
        board.push(rowsArray);
        for (let j = 0; j < numColumnsParam; j++) {
            board[i][j] = {};
            const cell = board[i][j];
            cell.id = i + ',' + j; 
            cell.row = i; 
            cell.column = j; 
            cell.isMine = false;
            cell.isHidden = true; 
            cell.isFlagged = false; 
            cell.numAdjMines = 0; 
        }
    }
    return board; 
}
