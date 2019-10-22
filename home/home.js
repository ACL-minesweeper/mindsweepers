import makeUser from '../home/make-user.js';
import { saveUser } from '../common/utils.js';



let userName = document.getElementById('name').textContent;
const playGameButton = document.getElementById('play-game');


playGameButton.addEventListener('click', function() {

    let currentUser = makeUser(userName);

    saveUser(currentUser);





    //window.location = 'gameboard';
});