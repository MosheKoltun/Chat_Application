const User = require('./user.js');
//========================================================
// Array of 'User' Objects
var userObjectList = [];
var IDsAndUsersDictionary = {};
//========================================================
module.exports = {
    doesUserExist:doesUserExist,
    getListOfAllUserObjects:getListOfAllUserObjects,
    getUserObjectAccordingToID:getUserObjectAccordingToID,
    createNewUser:createNewUser,
    removeUser:removeUser,
    updateUsername:updateUsername,
    updateUserAge:updateUserAge,
};
//=========================================================
function getListOfAllUserObjects() {
    return userObjectList;
}
//=========================================================
function doesUserExist(username) {
    for(var i=0; i<userObjectList.length; i++) {
        var userObject = userObjectList[i];
        if (userObject.getUserName() === username) {
            return userObject;
        }
    }
    return null;
}
//=========================================================
function generateUserID() {
    for (var ID=0; ID < Number.MAX_VALUE; ID++)
        if (!IDsAndUsersDictionary[ID]) {
            return ID;
        }
    // new ID numbers are not available(reached the maximum of the ES5 'Number')
    return -1;
}
//=========================================================
function getUserObjectAccordingToID(userID) {
    if (!IDsAndUsersDictionary[userID]) {
        return null;
    }
    // if ID exist
    var userObject =  IDsAndUsersDictionary[userID];
    return userObject;
}
//========================================================
function createNewUser(username, password, age) {
    // generate new ID
    var userID = generateUserID();
    // if reached maximum of ES5 'Number'
    if (userID === -1) {
        return false;
    }
    // create new user
    var newUser = new User(userID, username, password, age);
    // update lists
    userObjectList.push(newUser);
    IDsAndUsersDictionary[userID] = newUser;

    return newUser;
}
//=========================================================
function removeUser(username) {
    for(var i=0; i<userObjectList.length; i++) {
        var userObject = userObjectList[i];
        if (userObject.getUserName() === username){
            // Disconnect userObjectList from all its variables
                // so that garbage collector could handle it
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


