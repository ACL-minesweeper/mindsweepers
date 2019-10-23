import makeUser from '../home/make-user.js';
import { saveUser } from '../common/utils.js';


const playGameButton = document.getElementById('play-game');


playGameButton.addEventListener('click', function() {

    let userName = document.getElementById('name').value;

    console.log(userName, 'this is the user name');


    
    const madeUser = makeUser(userName);

    saveUser(madeUser);

    // take user to the game page when they click the "play game" button 
    window.location = '../game/';
});