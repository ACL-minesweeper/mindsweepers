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
function generateRandomIndex(lengthOfArray) {
    const integer = Math.floor(Math.random() * lengthOfArray); 
    return integer; 
}

function getArrayOfMineCoordinates(numMines, numRows, numColumns, firstClickArray) {
    // initialize an empty array that we will push coordinate pairs into (coorcinate pairs will each be an array of two numbers)
    const arrayOfMineCoordinates = []; 

    while (arrayOfMineCoordinates.length !== numMines) {
        const rowIndex = generateRandomIndex(numRows);
        const columnIndex = generateRandomIndex(numColumns); 
        const coordinateArray = [rowIndex, columnIndex]; 

        if (!arrayOfMineCoordinates.includes(coordinateArray) && coordinateArray !== firstClickArray) {
            arrayOfMineCoordinates.push(coordinateArray); 
        }
    }
    return arrayOfMineCoordinates; 
}