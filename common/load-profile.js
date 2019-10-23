import { getUser } from './utils.js';


const loadProfile = () => {
    const user = getUser(); 
    if (user === null) { // because if there is no user then the getUser function returns null (!user)
        window.location = './'; // will redirect to the home directory, aka root index.html 
    } else {
        console.log(user, 'this is user in load profile');
        return user; 
    }
}; 

export default loadProfile; 