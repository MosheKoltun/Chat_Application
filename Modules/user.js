module.exports = User;
//========================================================
function User(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
}
//========================================================
User.prototype.getName = function () {
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
