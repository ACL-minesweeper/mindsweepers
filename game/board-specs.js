import state from '../game/state.js';

export const boardSpecs = {
    boardDimension: {
        small: 8,
        medium: 14,
        large: 20
    },
    mineConcentration: {
        beginner: 0.10,
        intermediate: 0.20,
        expert: 0.30
    },
    calculateMinesNumber(boardDimensionParam, mineConcentrationParam){
        return Math.floor(boardDimensionParam ** 2 * mineConcentrationParam);
    }
};
const boardSize = localStorage.getItem('board-size');
const difficulty = localStorage.getItem('difficulty');
const boardDimension = boardSpecs.boardDimension[boardSize];
const mineConcentration = boardSpecs.mineConcentration[difficulty];
state.numRows = boardDimension;
state.numColumns = boardDimension;
state.numMines = boardSpecs.calculateMinesNumber(boardDimension, mineConcentration);
state.initializeFlagsRemaining();
console.log(JSON.stringify(state), `on game page`);