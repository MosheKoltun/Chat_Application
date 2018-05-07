module.exports = User;
//========================================================
function User(userID, username, password, age) {
    this.userID = userID;
    this.username = username;
    this.password = password;
    this.age = age;
}
//========================================================
User.prototype.getID = function () {
    return this.userID;
};
//========================================================
User.prototype.setID = function (userID) {
    this.userID = userID;
};
//========================================================
User.prototype.getUserName = function () {
    return this.username;
};
//========================================================
User.prototype.setUsername = function (username) {
    this.username = username;
};
//========================================================
User.prototype.getAge = function () {
    return this.age;
};
//========================================================
User.prototype.setAge = function (age) {
     this.age = age;
};
//========================================================
