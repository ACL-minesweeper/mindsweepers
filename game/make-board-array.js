export function makeBoardArray(numRows, numColumns) {
    const board = []; 
    for (let i = 0; i < numRows; i++) {
        const rowsArray = [];
        board.push(rowsArray);

        for (let j = 0; j < numColumns; j++) {
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