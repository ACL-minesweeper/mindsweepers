import loadProfile from '../common/load-profile.js';


const userProfile = document.getElementById('profile-user-name');
const totalWins = document.getElementById('total-wins');
const totalLosses = document.getElementById('total-losses'); 

const currentUser = loadProfile(); 

userProfile.textContent = currentUser.user; 
totalWins.textContent = currentUser.wins; 
totalLosses.textContent = currentUser.losses; 
