// create userSelections object
export const saveUserState = userObj => {
    let userState = {
        name: userObj.name,
        wins: 0,
        losses: 0,
        theme: userObj.theme,
    };
    const json = JSON.stringify(userState);
    localStorage.setItem('userState', json);
};

// get user from local storage
export const getUserState = () => {
    const json = localStorage.getItem('userState');
    if (!json) return null;
    const userState = JSON.parse(json);
    return userState;
};

// redirect to home page if user does not exist in local storage for some reason
export const returnHomeIfNoValidUser = userObj => {
    if (userObj === null
    || userObj.name === null
    || userObj.name === ''
    || userObj.theme === null
    || userObj.theme === '')
        (window.location = '../');
};

// update user win/loss record in local storage
export const updateUserState = (userObjParam, isWinParam) => {
    if (isWinParam) {
        userObjParam.wins++;
    } else {
        userObjParam.losses++;
    }
    // save updated user to local storage
    saveUserState(userObjParam);
};