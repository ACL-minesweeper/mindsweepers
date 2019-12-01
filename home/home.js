import { saveUserState } from '../common/user.js';
import state from '../game/state.js';

const user = {};
const userThemeForm = document.getElementById('theme-selection');
user.theme = 'deep-space';

userThemeForm.addEventListener('change', function(){
    const userThemeSelection = userThemeForm.querySelector('input:checked').value;
    document.getElementById(userThemeSelection).classList.remove('hidden');
    const notUserThemeSelection = userThemeForm.querySelector('input:not(:checked)').value;
    document.getElementById(notUserThemeSelection).classList.add('hidden');
});

const userInfoForm = document.getElementById('user-info-form');
userInfoForm.addEventListener('submit', processForm);
function processForm(event) {
    event.preventDefault();
    const formData = new FormData(userInfoForm);
    const userThemeSelection = userThemeForm.querySelector('input:checked').value;
    user.theme = userThemeSelection;
    user.name = formData.get('name');
    user.boardSize = formData.get('board-size');
    user.difficulty = formData.get('difficulty');
    saveUserState(user);
    window.location = './game/index.html';
}
