// IMPORT MODULES under test here:
import { getRows, getColumns, isWin } from '../common/utils.js';
import { makeBoardArray } from '../game/make-board-array.js';
import giveBoardArrayMines from '../game/give-board-array-mines.js';
import giveBoardNumAdjMines from '../game/give-board-numAdjMines.js';

const test = QUnit.test;

test('testBoard has anticipated number of rows and columns', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const testBoard = makeBoardArray(3, 4);
    const rowsExpected = 3;
    const columnsExpected = 4;

    //Act 
    // Call the function you're testing and set the result to a const
    const rowsResult = getRows(testBoard);
    const columnsResult = getColumns(testBoard);

    //Assert
    // Make assertions about what is expected valid result
    assert.deepEqual([rowsExpected, columnsExpected], [rowsResult, columnsResult]);
});

test('isMine is changed to true for a mine placed on testBoard and a cell that is not a mine isMine property is false.', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const testBoard = makeBoardArray(3, 3);
    const minesArray = [[0, 0], [1, 1], [2, 2]];
    const expectedMine1 = true;
   // const expectedMine2 = true;
   // const expectedMine3 = true;
    const expectedNotMine = false;
    giveBoardArrayMines(testBoard, minesArray);

    //Act 
    // Call the function you're testing and set the result to a const
    const resultMine1 = testBoard[0][0].isMine;
    const resultNotMine = testBoard[0][1].isMine;

    //Assert
    // Make assertions about what is expected valid result
    assert.deepEqual(expectedMine1, resultMine1);
    assert.deepEqual(expectedNotMine, resultNotMine);
});

test('numAdjcell is updated properly for 3 mines on a 4x3 board', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const testBoard = makeBoardArray(4, 3);
    const minesArray = [[0, 0], [2, 1], [3, 2]];
    const numAdjExpectedValue0 = 0;
    const numAdjExpectedValue1 = 1;
    const numAdjExpectedValue2 = 2;
    //Act 
    // Call the function you're testing and set the result to a const
    giveBoardArrayMines(testBoard, minesArray);
    giveBoardNumAdjMines(testBoard, minesArray);
    const numAdjResultValue0 = testBoard[0][2].numAdjMines;
    const numAdjResultValue1 = testBoard[3][2].numAdjMines;
    const numAdjResultValue2 = testBoard[1][0].numAdjMines; 
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(numAdjResultValue0, numAdjExpectedValue0);
    assert.equal(numAdjResultValue1, numAdjExpectedValue1);
    assert.equal(numAdjResultValue2, numAdjExpectedValue2);

});

test('isWin returns true when every cell that is not a mine is not hidden', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const testBoard = makeBoardArray(2, 2);
    const minesArray = [[0, 0], [1, 1]];
    giveBoardArrayMines(testBoard, minesArray);

    const expectedWin = true;
    //Act 
    // Call the function you're testing and set the result to a const
    const flagsLeft = 0;
    testBoard[0][1].isHidden = false;
    testBoard[1][0].isHidden = false;
    const resultWin = isWin(testBoard, flagsLeft);

    //Assert
    // Make assertions about what is expected valid result
    assert.equal(expectedWin, resultWin);
});

test('isWin returns false if all all cell that are not mines are hidden', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const testBoard = makeBoardArray(2, 2);
    const minesArray = [[0, 0], [1, 1]];
    giveBoardArrayMines(testBoard, minesArray);
    const flagsLeft = 0;
    testBoard[1][0].isHidden = false;
    testBoard[0][1].isHidden = true;
    const expected = false;
    //Act 
    // Call the function you're testing and set the result to a const
    const result = isWin(testBoard, flagsLeft);

    //Assert
    // Make assertions about what is expected valid result
    assert.equal(expected, result);
});