import { getUserState, returnHomeIfNoUser } from '../common/user.js';

const userState = getUserState();
returnHomeIfNoUser(userState);

const userProfile = document.getElementById('profile-user-name');
const totalWins = document.getElementById('total-wins');
const totalLosses = document.getElementById('total-losses'); 

// need to wrap in if statement to avoid a momentary flash of invalid content if there is no user
if (userState) {
    userProfile.textContent = userState.user; 
    totalWins.textContent = userState.wins; 
    totalLosses.textContent = userState.losses;
}
