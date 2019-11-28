import makeUser from '../home/make-user.js';
import { saveUser } from '../common/utils.js';

const userThemeForm = document.getElementById('theme-selection');
localStorage.setItem('theme', 'deep-space');

userThemeForm.addEventListener('change', function(){
    const userThemeSelection = userThemeForm.querySelector('input:checked').value;
    document.getElementById(userThemeSelection).classList.remove('hidden');
    const notUserThemeSelection = userThemeForm.querySelector('input:not(:checked)').value;
    document.getElementById(notUserThemeSelection).classList.add('hidden');
    localStorage.setItem('theme', userThemeSelection);
});

const userInfoForm = document.getElementById('user-info-form');
userInfoForm.addEventListener('submit', processForm);
function processForm(event) {
    event.preventDefault();
    const formData = new FormData(userInfoForm);
    const user = formData.get('name');
    const boardSize = formData.get('board-size');
    const difficulty = formData.get('difficulty');
    localStorage.setItem('board-size', boardSize);
    localStorage.setItem('difficulty', difficulty);
    const userObject = makeUser(user);
    saveUser(userObject);
    window.location = './game/index.html';
}
