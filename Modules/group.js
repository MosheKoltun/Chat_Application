module.exports = Group;
//========================================================
function Group(name, users, groups) {
    this.name = name;
    this.users = users || [];
    this.groups = groups || [];
}
//========================================================
Group.prototype.getName = function () {
    return this.name;
};
//========================================================
Group.prototype.getUsers = function () {
    return this.users;
};
//========================================================
Group.prototype.addUser = function (userInstance) {
    // This ensures all 'Group' instances contain either user or group children
    if (this.groups.length !== 0) {
        return false;
    }
    this.users.push(userInstance);
    return true;
};
//========================================================
Group.prototype.removeUser = function (username) {
    for (var i = 0; i < this.users.length; i++) {
        var userInstance = this.users[i];
        if (userInstance.getName() === username) {
            this.users.splice(i, 1);
        }
    }
};
//========================================================
Group.prototype.getGroups = function () {
    return this.groups;
};
//========================================================
Group.prototype.addGroup = function (groupInstance) {
    // This ensures all 'Group' instances contain either user or group children
    if (this.users.length !== 0) {
        return false;
    }
    this.groups.push(groupInstance);
    return true;
};
//========================================================
Group.prototype.removeGroup = function (GroupName) {
    for (var i = 0; i < this.groups.length; i++) {
        var groupInstance = this.groups[i];
        if (groupInstance.getName() === GroupName) {
            this.groups.splice(i, 1);
        }
    }
};
