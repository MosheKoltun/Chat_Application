(function init(){
    usersList = {};
})();

//========================================================
function User(name, password, age) {
    this.name = name;
    this.password = password;
    this.age = age;
}
//========================================================
User.prototype.setName = function (name) {
    this.name = name;
}
//========================================================
User.prototype.getName = function () {
    return this.name;
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
function createNewUser(name, password, age) {
    var newUser = new User(name, password, age);
    usersList[name] = newUser;
}
//========================================================
function getListOfUserNames() {
    var listOfUsernames = [];
    for(user in usersList) {
        listOfUsernames.push(usersList[user].getName());
    }
    return listOfUsernames;
}
//=========================================================
module.exports.createNewUser = createNewUser;
module.exports.getListOfUserNames = getListOfUserNames;
