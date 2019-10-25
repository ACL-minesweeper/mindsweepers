import makeUser from '../home/make-user.js';
import { saveUser } from '../common/utils.js';

const userInfoForm = document.getElementById('get-user-name');
userInfoForm.addEventListener('submit', processForm);

function processForm(event) {
    event.preventDefault();
    const formData = new FormData(userInfoForm);
    const user = getUserName(formData);
    const userObject = makeUser(user);
    saveUser(userObject);
    window.location = './game/index.html';
}

function getUserName(formData) {
    const user = formData.get('name');
    return user;
}
