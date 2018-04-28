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
module.exports = User;
