import makeUser from '../home/make-user.js';
import { saveUser } from '../common/utils.js';

const userInfoForm = document.getElementById('user-info-form');
userInfoForm.addEventListener('submit', processForm);

function processForm(event) {
    event.preventDefault();
    const formData = new FormData(userInfoForm);
    const user = formData.get('name');
    const boardSize = formData.get('board-size');
    const difficulty = formData.get('difficulty');
    const theme = formData.get('theme');
    localStorage.setItem('board-size', boardSize);
    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('theme', theme);
    const userObject = makeUser(user);
    saveUser(userObject);
    window.location = './game/index.html';
}
