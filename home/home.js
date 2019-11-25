import makeUser from '../home/make-user.js';
import { saveUser } from '../common/utils.js';
import state from '../game/state.js';

const userInfoForm = document.getElementById('user-info-form');
userInfoForm.addEventListener('submit', processForm);

const boardSpecs = {
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

function processForm(event) {
    event.preventDefault();
    const formData = new FormData(userInfoForm);
    const user = formData.get('name');
    const boardSize = formData.get('board-size');
    const difficulty = formData.get('difficulty');
    const boardDimension = boardSpecs.boardDimension[boardSize];
    const mineConcentration = boardSpecs.mineConcentration[difficulty];
    state.numRows = boardDimension;
    state.numColumns = boardDimension;
    state.numMines = boardSpecs.calculateMinesNumber(boardDimension, mineConcentration);
    console.log(JSON.stringify(state), `on homepage`);
    const theme = formData.get('theme');
    const userObject = makeUser(user);
    saveUser(userObject);
    window.location = './game/index.html';
}
