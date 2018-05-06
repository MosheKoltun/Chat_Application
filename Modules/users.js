const User = require('./user.js');
//========================================================
// Array of 'User' Objects
var userObjectList = [];
//========================================================
module.exports = {
    createNewUser:createNewUser,
    getListOfUserNames:getListOfUserNames,
    doesUserExist:doesUserExist,
    removeUser:removeUser,
    updateUsername:updateUsername,
    updateUserAge:updateUserAge,
};
//========================================================
function createNewUser(username, password, age) {
    var newUser = new User(username, password, age);
    userObjectList.push(newUser);
    return newUser;
}
//========================================================
function doesUserExist(username) {
    if (userObjectList.length === 0) {
        return null;
        // in case 'userObjectList' is empty
    }
    for (var i = 0; i < userObjectList.length; i++) {
        if (userObjectList[i].getName() === username) {
            return userObjectList[i]; //
            // If user exist. Return from function immediately
        }
    }
    return null;
    // If user does not exist
}
//=========================================================
function getListOfUserNames() {
    var usernameList = [];
    if (userObjectList.length > 0) {
        for (var i = 0; i < userObjectList.length; i++) {
            usernameList.push(userObjectList[i].getName());
        }
    }
    return usernameList;
}
//=========================================================
function removeUser(username) {
    for(var i=0; i<userObjectList.length; i++) {
        if (userObjectList[i].getName() === username){
            userObjectList.splice(i,1);
            // Delete an array member
            return true;
        }
    }
    return false;
}
//=========================================================
function updateUsername(oldUsername, newUsername) {
    for(var i=0; i<userObjectList.length; i++) {
        if (userObjectList[i].getName() === oldUsername){
            userObjectList[i].setUsername(newUsername);
            return true;
        }
    }
    return false;
}
//=========================================================
function updateUserAge(username, newUserAge) {
    for(var i=0; i<userObjectList.length; i++) {
        if (userObjectList[i].getName() === username){
            userObjectList[i].setAge(newUserAge);
            return true;
        }
    }
    return false;
}


