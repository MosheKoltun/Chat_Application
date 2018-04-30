module.exports = Group;
//========================================================
function Group(name, users) {
    this.name = name;
    this.users = users || [];
}
//========================================================
Group.prototype.addUser = function (name) {
    this.name = name;
}
//========================================================
Group.prototype.getName = function () {
    return this.name;
}
