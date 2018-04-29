(function init(){
    userObjectList = []; // values = 'User' objects
})();

//========================================================
function User(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
}
//========================================================
User.prototype.setUsername = function (username) {
    this.username = username;
}
//========================================================
User.prototype.getUsername = function () {
    return this.username;
}
//========================================================
User.prototype.setPassword = function (password) {
    this.password = password;
}
//========================================================
User.prototype.setAge = function (age) {
    this.age = age;
}
//========================================================
function createNewUser(username, password, age) {
    var newUser = new User(username, password, age);
    userObjectList.push(newUser);
    return newUser;
}
//========================================================
function getListOfUserNames() {
    var usernameList = [];
    if (userObjectList.length > 0) {
        for (var i = 0; i < userObjectList.length; i++) {
            usernameList.push(userObjectList[i].getUsername());
        }
    }
    return usernameList;
}
//=========================================================
function doesUserExist(username) {
    if (userObjectList.length > 0) {
        for (var i = 0; i < userObjectList.length; i++) {
            if (userObjectList[i].getUsername() === username) {
                return true; // user exist. Return from function immediately
            }
        }
    }
        return false;
        // user does not exist
        // or in case 'userObjectList' is empty
}
//=========================================================
function removeUser(username) {
    for(var i=0; i<userObjectList.length; i++) {
        if (userObjectList[i].getUsername() === username){
            userObjectList.splice(i,1); // delete an array member and reindex.
            return true;
        }
    }
    return false;
}
//=========================================================
module.exports.User = User;
module.exports.createNewUser = createNewUser;
module.exports.getListOfUserNames = getListOfUserNames;
module.exports.doesUserExist = doesUserExist;
module.exports.removeUser = removeUser;


