

function makeUser(username) {
    let newUser = {
        user: username,
        wins: 0,
        losses: 0
    };

    return newUser;
}

export default makeUser;