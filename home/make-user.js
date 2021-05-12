/* 
could be refactored to:

const makeUser = username => ({
        user: username,
        wins: 0,
        losses: 0
});
*/
const makeUser = username => {
    let newUser = {
        user: username,
        wins: 0,
        losses: 0
    };
    return newUser;
};

export default makeUser;
