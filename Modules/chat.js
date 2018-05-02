const userFuncs = require('./users.js');
const groupFuncs = require('./groups.js');

//=========================================================
module.exports = {
    addUserToGroup:addUserToGroup,
    removeUserFromGroup:removeUserFromGroup,
    createGroupsUsersDisplayTree:createGroupsUsersDisplayTree,
};
//=========================================================
// addUserToGroup
//=========================================================
function addUserToGroup(groupName, username){
    // check that there is no such group in the system at all
    // (Inside the array kept in groups.js called 'groupObjectList')
    var groupObject = groupFuncs.doesGroupExist(groupName);
    if (groupObject!=null) {
        // check that there is no such user in the system at all
        // (Inside the array kept in users.js called 'userObjectList')
        var userObject = userFuncs.doesUserExist(username);
        if (userObject!=null) {
            var res = doesUserExistInGroupsUsersDisplayTree(username);
            // If user is not is group users
            if (!res) { // user is not is group users
                groupFuncs.addUserToGroup(groupName, userObject);
                return true;
            }
        }
    }
    return false;
}
//=========================================================
// doesUserExistInGroupsUsersDisplayTree
//=========================================================
function doesUserExistInGroupsUsersDisplayTree(input) {
    var listOfGroupAndUsers = createGroupsUsersDisplayTree();

    for (var groupName in listOfGroupAndUsers) {

        var listOfUsernamesAndAges = listOfGroupAndUsers[groupName];

        for (var username in listOfUsernamesAndAges) {
            if (username === input) {
                return true;
            }
        }
        return false;
    }
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
// createGroupsUsersDisplayTree
//=========================================================
function createGroupsUsersDisplayTree(){
    //This Function returns a tree of strings
    //Only group names and username and ages
    //notice: it does not return objects

    var groupsUsersDisplayTree = {};
    // {"groupName" : {"username" : "("+age+")"}}
    // example: {group1 : {user1 : (34)}, group2 : {user2: (14), user3 : (50)}}

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
        groupsUsersDisplayTree[groupName]=listOfUsernamesAndAges;
    }
    return groupsUsersDisplayTree;
}
