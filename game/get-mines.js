import { generateRandomIndex } from '../common/utils.js';
import { isValidRowIndexFunc, isValidColumnIndexFunc } from './give-board-numAdjMines.js';

export function getArrayOfMineCoordinates(stateParam, boardArrayParam, firstClickArrayParam) {
  // initialize an empty array that we will push coordinate pairs into (coorcinate pairs will each be an array of two numbers)
    const arrayOfMineCoordinates = [];

  //generate possible mine coordinates until the number of mine coordinates (set by numMines) is met
    while (arrayOfMineCoordinates.length !== stateParam.numMines) {
    //make the random coordinates that we might use
        const rowIndex = generateRandomIndex(stateParam.numRows);
        const columnIndex = generateRandomIndex(stateParam.numColumns);
        const potentialCoordinatePairArray = [rowIndex, columnIndex];

    // check for repeats of current mines already in the mine array
        const coordinateIsNotInArrayOfMineCoordinates = !arrayOfMineCoordinates.find(
            coordinate =>
                JSON.stringify(coordinate) === JSON.stringify(potentialCoordinatePairArray)
        );
    // avoid the the coordinate pair of the first click and the adjacent cells
    // so that first clicked has numAdjMines = 0
        const invalidMineCoordinatesPairsArr = getInvalidMineCoordinatesBasedOnFirstClick(boardArrayParam, firstClickArrayParam);
        const isNotFirstClickAreaArr =
        // if the randomly generated mine coordinate pair is found in the invalidMindCoordinatePairsArr
        // then ! and set equal to isNotFirstClickAreaArr
            !invalidMineCoordinatesPairsArr.find(invalidCoordinatePairArray =>
                JSON.stringify(invalidCoordinatePairArray) === JSON.stringify(potentialCoordinatePairArray));

    // if both of these conditions are met, push the coordinate pair into the array of mines that will actually be used in the game
        if (coordinateIsNotInArrayOfMineCoordinates && isNotFirstClickAreaArr) {
            arrayOfMineCoordinates.push(potentialCoordinatePairArray);
        }
    }
  //output
    return arrayOfMineCoordinates;
}

// goal: input coordinate of first click and boardArray
// output: array of invalid mine coordinates, could be size 4-9
const getInvalidMineCoordinatesBasedOnFirstClick = (boardArrayParam, firstClickArrayParam) => {
    
    const firstClickRow = firstClickArrayParam[0]; 
    const firstClickColumn = firstClickArrayParam[1]; 
    const invalidMineCoordinateArr = [];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            
            const cellRowIndex = firstClickRow + i; 
            const cellColumnIndex = firstClickColumn + j;
            // if this is a valid coordinate, push to array
            const isValidRowIndex = isValidRowIndexFunc(cellRowIndex, boardArrayParam);
            const isValidColumnIndex = isValidColumnIndexFunc(cellColumnIndex, boardArrayParam);
            if (isValidRowIndex && isValidColumnIndex) {
                invalidMineCoordinateArr.push([cellRowIndex, cellColumnIndex]);
            }
        }
    }
    return invalidMineCoordinateArr;
};
