// IMPORT MODULES under test here:
import { isWin } from '../common/utils.js';
import giveBoardArrayMines from '../game/give-board-array-mines.js';
import giveBoardNumAdjMines from '../game/give-board-numAdjMines.js';
import state from '../game/state.js';

const test = QUnit.test;

test('initializeFlagsRemaining sets state property of flagsRemaining to numMines', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const flagsRemainingExpected = 10;

    //Act 
    // Call the function you're testing and set the result to a const
    state.initializeFlagsRemaining();
    const flagsRemainingResult = state.flagsRemaining;

    //Assert
    // Make assertions about what is expected valid result
    assert.equal(flagsRemainingExpected, flagsRemainingResult);
});

test('updateClickedCellArray sets state property of clickedCellArray', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const clickedCellString = '2,3';
    const clickedCellArrayExpected = [2, 3];
    //Act 
    // Call the function you're testing and set the result to a const
    state.updateClickedCellArray(clickedCellString);
    const clickedCellArrayResult = state.clickedCellArray;

    //Assert
    // Make assertions about what is expected valid result
    assert.deepEqual(clickedCellArrayExpected, clickedCellArrayResult);
});


test('initializeBlankBoardArray generates board with anticipated number of rows', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    state.initializeBlankBoardArray();
    const rowsExpected = state.numRows;

    //Act 
    // Call the function you're testing and set the result to a const
    const rowsResult = state.boardArray.length;

    //Assert
    // Make assertions about what is expected valid result
    assert.equal(rowsResult, rowsExpected);
});

test('giveBoardArrayMines changes isMine to true for a mine placed on boardArray', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    state.initializeBlankBoardArray();
    const minesArray = [[0, 0], [1, 1], [2, 2]];
    const expectedMine1 = true;
    giveBoardArrayMines(minesArray, state);

    //Act 
    // Call the function you're testing and set the result to a const
    const resultMine1 = state.boardArray[0][0].isMine;

    //Assert
    // Make assertions about what is expected valid result
    assert.deepEqual(expectedMine1, resultMine1);
});

test('when giveBoardArrayMines is run,  isMine property stays false for cells that are not mines.', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    state.initializeBlankBoardArray();
    const minesArray = [[0, 0], [1, 1], [2, 2]];
    const expectedNotMine = false;
    giveBoardArrayMines(minesArray, state);

    //Act 
    // Call the function you're testing and set the result to a const
    const resultNotMine = state.boardArray[0][1].isMine;

    //Assert
    // Make assertions about what is expected valid result
    assert.deepEqual(expectedNotMine, resultNotMine);
});

test('numAdjcell is updated properly for 3 mines on a 8x8 board', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    state.initializeBlankBoardArray();
    const minesArray = [[0, 0], [2, 1], [3, 2]];
    const numAdjExpectedValue0 = 0;
    const numAdjExpectedValue1 = 1;
    const numAdjExpectedValue2 = 2;
    //Act 
    // Call the function you're testing and set the result to a const
    giveBoardArrayMines(minesArray, state);
    giveBoardNumAdjMines(state.boardArray, minesArray);
    const numAdjResultValue0 = state.boardArray[0][2].numAdjMines;
    const numAdjResultValue1 = state.boardArray[3][0].numAdjMines;
    const numAdjResultValue2 = state.boardArray[1][0].numAdjMines; 
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(numAdjResultValue0, numAdjExpectedValue0);
    assert.equal(numAdjResultValue1, numAdjExpectedValue1);
    assert.equal(numAdjResultValue2, numAdjExpectedValue2);

});

test('isWin returns true when every cell that is not a mine is not hidden', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    state.initializeBlankBoardArray();
    const minesArray = [[0, 0], [1, 1]];
    giveBoardArrayMines(minesArray, state);
    const expectedWin = true;
    //Act 
    // Call the function you're testing and set the result to a const
    state.flagsRemaining = 0;
    state.boardArray.forEach(row => {
        row.forEach(cell => {
            cell.isHidden = false;
        });
    });

    state.boardArray[0][0].isHidden = false;
    state.boardArray[1][1].isHidden = false;

    const resultWin = isWin();

    //Assert
    // Make assertions about what is expected valid result
    assert.equal(expectedWin, resultWin);
});

test('isWin returns false if a cell that is not a mine is hidden', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    state.initializeBlankBoardArray();
    const minesArray = [[0, 0], [1, 1]];
    giveBoardArrayMines(minesArray, state);
    const expectedIsWin = false;
    //Act 
    // Call the function you're testing and set the result to a const
    state.flagsRemaining = 0;
    state.boardArray.forEach(row => {
        row.forEach(cell => {
            cell.isHidden = false;
        });
    });

    state.boardArray[0][0].isHidden = false;
    state.boardArray[1][1].isHidden = false;
    state.boardArray[1][0].isHidden = true;

    const resultWin = isWin();

    //Assert
    // Make assertions about what is expected valid result
    assert.equal(expectedIsWin, resultWin);
});