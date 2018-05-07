const User = require('./user.js');
//========================================================
// Array of 'User' Objects
var userObjectList = [];
var IDsAndUsersDictionary = {};
//========================================================
module.exports = {
    createNewUser:createNewUser,
    getListOfUserNames:getListOfUserNames,
    doesUserExist:doesUserExist,
    removeUser:removeUser,
    updateUsername:updateUsername,
    updateUserAge:updateUserAge,
};
//=========================================================
function generateUserID() {
    for (var ID=0; ID < Number.MAX_VALUE; ID++)
        if (!IDsAndUsersDictionary[ID]) {
            return ID;
        }
    // new ID numbers are not available(reached the maximum of the ES5 'Number')
    return -1;
}
//========================================================
function createNewUser(username, password, age) {
    var userID = generateUserID();
    if (userID === -1) {
        return false;
    }

    var newUser = new User(userID, username, password, age);

    userObjectList.push(newUser);
    IDsAndUsersDictionary[userID] = newUser;

    return newUser;
}
//========================================================
function doesUserExist(username) {
    if (userObjectList.length === 0) {
        return null;
        // in case 'userObjectList' is empty
    }
    for (var i = 0; i < userObjectList.length; i++) {
        if (userObjectList[i].getUserName() === username) {
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
            usernameList.push(userObjectList[i].getUserName());
        }
    }
    return usernameList;
}
//=========================================================
function removeUser(username) {
    for(var i=0; i<userObjectList.length; i++) {
        var userObject = userObjectList[i];
        if (userObject.getUserName() === username){
            // Disconnect userObjectList from all its variables
            // so garbage collector could handle it

            // Delete an array member
            userObjectList.splice(i,1);

            // remove from ID list
            delete IDsAndUsersDictionary[userObject.getID()];
            return true;
        }
    }
    return false;
}
//=========================================================
function updateUsername(oldUsername, newUsername) {
    for(var i=0; i<userObjectList.length; i++) {
        if (userObjectList[i].getUserName() === oldUsername){
            userObjectList[i].setUsername(newUsername);
            return true;
        }
    }
    return false;
}
//=========================================================
function updateUserAge(username, newUserAge) {
    for(var i=0; i<userObjectList.length; i++) {
        if (userObjectList[i].getUserName() === username){
            userObjectList[i].setAge(newUserAge);
            return true;
        }
    }
    return false;
}


