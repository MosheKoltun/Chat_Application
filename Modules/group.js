module.exports = Group;
//========================================================
function Group(groupID, name, users, groups) {
    this.groupID = groupID;
    this.name = name;
    this.users = users || [];
    this.groups = groups || [];
}

//Getters and setters

//========================================================
Group.prototype.getID = function () {
    return this.groupID;
};
//========================================================
Group.prototype.getGroupName = function () {
    return this.name;
};
//========================================================
Group.prototype.getUsers = function () {
    return this.users;
};
//========================================================
Group.prototype.getGroups = function () {
    return this.groups;
};
//========================================================
Group.prototype.setID = function (groupID) {
    this.groupID = groupID;
};
//========================================================
Group.prototype.setGroups = function (groups) {
    this.groups = groups;
};
//========================================================
Group.prototype.setUsers = function (users) {
    this.users = users;
};


// Add/Remove functionality

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
        if (userInstance.getUserName() === username) {
            this.users.splice(i, 1);
        }
    }
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
        if (groupInstance.getGroupName() === GroupName) {
            this.groups.splice(i, 1);
        }
    }
};
