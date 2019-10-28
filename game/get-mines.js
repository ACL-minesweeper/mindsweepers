import { generateRandomIndex } from '../common/utils.js';
import { getValidAdjCells } from '../common/utils.js';
import state from './state.js';

export function getArrayOfMineCoordinates() {
    // initialize an empty array to push mine coordinates
    const arrayOfMineCoordinates = [];

    // avoid the the coordinate pair of the first click and the adjacent cells
    // so that first clicked has numAdjMines = 0
    const invalidMineCoordinatesPairsArr = getInvalidMineCoordinatesBasedOnFirstClick();

    //generate possible mine coordinates until the number of mine coordinates (set by numMines) is met
    while (arrayOfMineCoordinates.length !== state.numMines) {
    //make the random coordinates that we might use
        const rowIndex = generateRandomIndex(state.numRows);
        const columnIndex = generateRandomIndex(state.numColumns);
        const potentialCoordinatePairArray = [rowIndex, columnIndex];

        // check for repeats of current mines already in the mine array
        const coordinateIsNotInArrayOfMineCoordinates = !arrayOfMineCoordinates.find(
            coordinate =>
                JSON.stringify(coordinate) === JSON.stringify(potentialCoordinatePairArray)
        );
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

// output an array of invalid mine coordinates, could be size 4-9
const getInvalidMineCoordinatesBasedOnFirstClick = () => {
    const invalidMineCoordinateArr = [];
    getValidAdjCells(state.clickedCellArray, true).forEach(validCell => {
        const cellRowIndex = validCell[0];
        const cellColumnIndex = validCell[1];
        invalidMineCoordinateArr.push([cellRowIndex, cellColumnIndex]);
    });
    return invalidMineCoordinateArr;
};
