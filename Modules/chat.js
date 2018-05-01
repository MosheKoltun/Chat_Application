const userFuncs = require('./users.js');
const groupFuncs = require('./groups.js');

//=========================================================
module.exports = {
    addUserToGroup:addUserToGroup,
    removeUserFromGroup:removeUserFromGroup,
    getListOfGroupAndUsers:getListOfGroupAndUsers,
};
//=========================================================
// addUserToGroup
//=========================================================
function addUserToGroup(groupName, username){
    var groupObject = groupFuncs.doesGroupExist(groupName);
    if (groupObject!=null) {
        var userObject = userFuncs.doesUserExist(username);
        if (userObject!=null) {
            groupFuncs.addUserToGroup(groupName, userObject);
            return true;
        }
    }
    return false;
}
//=========================================================
// removeUserFromGroup
//=========================================================
function removeUserFromGroup(groupName, username){
    var groupObject = groupFuncs.doesGroupExist(groupName);
    if (groupObject===null) {
        return false;
    }
    var userObject = userFuncs.doesUserExist(username);
    if (userObject===null) {
        return false;
    }
    groupFuncs.removeUserFromGroup(groupName, userObject);
    return true;
}
//=========================================================
// getListOfGroupAndUsers
//=========================================================
function getListOfGroupAndUsers(){
    var listOfGroupAndUsers = {};

    var groupObjectList = groupFuncs.getGroupObjectList();

    for (var i=0; i<groupObjectList.length; i++) {

        var listOfUsernamesAndAges = {};
        var groupObject = groupObjectList[i];
        var groupName = groupObject.getName();
        var usersInGroupList = groupObject.getUsers();

        for (var j=0; j<usersInGroupList.length; j++) {

            var username = usersInGroupList[j].getName();
            var userAge = usersInGroupList[j].getAge();

            listOfUsernamesAndAges[username]=userAge;
        }
        listOfGroupAndUsers[groupName]=listOfUsernamesAndAges;
    }
    return listOfGroupAndUsers;
}