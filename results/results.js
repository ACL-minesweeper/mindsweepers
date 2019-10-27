import { getUser, returnHomeIfNoUser } from '../common/utils.js';

const currentUser = getUser();
returnHomeIfNoUser(currentUser);

const userProfile = document.getElementById('profile-user-name');
const totalWins = document.getElementById('total-wins');
const totalLosses = document.getElementById('total-losses'); 

// need to wrap in if statement to avoid a momentary flash of invalid content if there is no user
if (currentUser) {
    userProfile.textContent = currentUser.user; 
    totalWins.textContent = currentUser.wins; 
    totalLosses.textContent = currentUser.losses;
}
