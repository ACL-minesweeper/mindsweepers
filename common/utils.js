// getRows function gets the number of rows 
// one of the rules is that the board will always be rectangular

function getRows(boardArray) {
    return boardArray.length; 
}

function getColumns(boardArray) {
    const firstItem = boardArray[0]; 
    return firstItem.length; 
}

// this function returns an integer between 0 and n-1, where n is either the number of rows or the number of columns 
export function generateRandomIndex(lengthOfArray) {
    const integer = Math.floor(Math.random() * lengthOfArray); 
    return integer; 
}







