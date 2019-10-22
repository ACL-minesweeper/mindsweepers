import { generateRandomIndex } from '../common/utils.js';

export function getArrayOfMineCoordinates(
    numMines,
    numRows,
    numColumns,
    firstClickArray
) {
  // initialize an empty array that we will push coordinate pairs into (coorcinate pairs will each be an array of two numbers)
    const arrayOfMineCoordinates = [];

  //generate possible mine coordinates until the number of mine coordinates (set by numMines) is met
    while (arrayOfMineCoordinates.length !== numMines) {
    //make the random coordinates that we might use
        const rowIndex = generateRandomIndex(numRows);
        const columnIndex = generateRandomIndex(numColumns);
        const potentialCoordinateArray = [rowIndex, columnIndex];

    // check for repeats of current mines already in the mine array
        const coordinateIsNotInArrayOfMineCoordinates = !arrayOfMineCoordinates.find(
            coordinate =>
                JSON.stringify(coordinate) === JSON.stringify(potentialCoordinateArray)
        );
    // avoid the one coordinate pair that represents the user's first click on the board
        const isNotFirstClickArray =
      JSON.stringify(potentialCoordinateArray) !==
      JSON.stringify(firstClickArray);

    // if both of these conditions are met, push the coordinate pair into the array of mines that will actually be used in the game
        if (coordinateIsNotInArrayOfMineCoordinates && isNotFirstClickArray) {
            arrayOfMineCoordinates.push(potentialCoordinateArray);
        }
    }
  //output
    return arrayOfMineCoordinates;
}
// console.log(getArrayOfMineCoordinates(8, 3, 3, [1, 0]));
