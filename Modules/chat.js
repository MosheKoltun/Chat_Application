const userFuncs = require('./users.js');
const groupFuncs = require('./groups.js');

// Tree Head
const head = groupFuncs.createNewGroup("General");

//=========================================================
module.exports = {
    addUserToGroup:addUserToGroup,
    removeUserFromGroup:removeUserFromGroup,
    addGroupToGroup:addGroupToGroup,
    removeGroupFromGroup:removeGroupFromGroup,
    searchGroupInGroupHierarchy:searchGroupInGroupHierarchy,
    printTree:printTree,
};
//=========================================================
// addUserToGroup
//=========================================================
function addUserToGroup(groupName, username){

    //Don't allow adding users to head (only allow adding groups to head)
    if (groupName === head.getName()) {
        return false;
    }

    // check if such group exists
    // (Inside 'groups.js' 'groupObjectList' array)
    var groupObject = groupFuncs.doesGroupExist(groupName);
    if (groupObject === null) {
        return false;
    }

    // check if such user exists
    // (Inside 'users.js' 'userObjectList' array)
    var userObject = userFuncs.doesUserExist(username);
    if (userObject === null) {
        return false;
    }

    // Check that user is not already a child of that group
    var listOfUsersInGroup = groupObject.getUsers();
    for (var i=0; i < listOfUsersInGroup.length; i++) {
        if (listOfUsersInGroup[i].getName() === username) {
            return false;
        }
    }

    //Add user
    var res = groupObject.addUser(userObject);
    console.log(res + "==> Parent: " + groupObject.getName() + " added child:" + userObject.getName());
    return res;
}
//=========================================================
// removeUserFromGroup
//=========================================================
function removeUserFromGroup(groupName, username){

    var groupObject = groupFuncs.doesGroupExist(groupName);
    if (groupObject === null) {
        return false;
    }

    var userObject = userFuncs.doesUserExist(username);
    if (userObject === null) {
        return false;
    }

    //remove user
    var childrenOfParentGroupObject = groupObject.getUsers();
    console.log("length= " + childrenOfParentGroupObject.length)
    for (var i = 0; i < childrenOfParentGroupObject.length; i++) {
        if (childrenOfParentGroupObject[i].getName() === username) {
            groupObject.removeUser(username);
            console.log("parent= " + groupName + " child= " + username);
            return true;
        }
    }
    return false;
}
//=========================================================
// addGroupToGroup
//=========================================================
function addGroupToGroup(parentGroupName, childGroupName){

    // Never allow making the head node a child of another group
    if (childGroupName === head.getName()) {
        return false;
    }

    // check if such group exists
    // (Inside 'groups.js' 'groupObjectList' array)
    var parentGroupObject = groupFuncs.doesGroupExist(parentGroupName);
    if (parentGroupObject === null) {
        return false;
    }

    // check if such group exists
    // (Inside 'groups.js' 'groupObjectList' array)
    var childGroupObject = groupFuncs.doesGroupExist(childGroupName);
    if (childGroupObject === null) {
        return false;
    }

    // Check that child group is not already an immediate child of that parent group
    // because if it is there is no point to try to add it again
    var listOfGroupsInGroup = parentGroupObject.getGroups();
    for (var i=0; i < listOfGroupsInGroup.length; i++) {
        if (listOfGroupsInGroup[i].getName() === childGroupName) {
            return false;
        }
    }

    //This condition helps verify that groups are not pointing each other across hierarchy
    //note that 1nd argument is a string and 2st argument is a reference to an object
    var res = areGroupsPointingEachOther(parentGroupName, childGroupObject);
    if (res) {
        return false;
    }

    //Add group
    var res = parentGroupObject.addGroup(childGroupObject);
    console.log(res + "==> Parent: " + parentGroupObject.getName() + " added child:" + childGroupObject.getName());
    return res;
}
//=========================================================
// removeGroupFromGroup
//=========================================================
function removeGroupFromGroup(parentGroupName, childGroupName){

    var parentGroupObject = groupFuncs.doesGroupExist(parentGroupName);
    if (parentGroupObject === null) {
        return false;
    }

    var childGroupObject = groupFuncs.doesGroupExist(childGroupName);
    if (childGroupObject === null) {
        return false;
    }

    //remove group
    var childrenOfParentGroupObject = parentGroupObject.getGroups();
    console.log("length= " + childrenOfParentGroupObject.length)
    for (var i = 0; i < childrenOfParentGroupObject.length; i++) {
        if (childrenOfParentGroupObject[i].getName() === childGroupName) {
            parentGroupObject.removeGroup(childGroupName);
            console.log("parent= " + parentGroupName + " child= " + childGroupName);
            return true;
        }
    }
    return false;
}
//=========================================================
// searchUserInGroupHierarchy
//=========================================================

//to be implemented later
function searchUserInGroupHierarchy(childUsername) {
    return false;
}

//=========================================================
// areGroupsPointingEachOther
//=========================================================
function areGroupsPointingEachOther(parentGroupName, childGroupName) {
    var arrayOfPath = [];
    //note that 'childGroupName' and 'parentGroupName' are inserted as arguments to the function in opposite order
    arrayOfPath = searchGroupInGroupHierarchyRecursion(childGroupName, parentGroupName, arrayOfPath);
    if (arrayOfPath.length === 0) {
        return false;
    }
    return true;
}
//=========================================================
// searchGroupInGroupHierarchy
//=========================================================
function searchGroupInGroupHierarchy(childGroupName) {
    var arrayOfPath = [];
    arrayOfPath = searchGroupInGroupHierarchyRecursion (head, childGroupName, arrayOfPath);
    if (arrayOfPath.length !== 0) {
        arrayOfPath.push(head.getName());
    }
    return arrayOfPath;
}
//---------------------------------------------------------

function searchGroupInGroupHierarchyRecursion(parentObject, childGroupName, arrayOfPath){
    var firstLevelChildrenOfParentGroup = parentObject.getGroups();
    for (var i = 0; i < firstLevelChildrenOfParentGroup.length; i++) {
        var groupObject = firstLevelChildrenOfParentGroup[i];
        if (groupObject.getName() === childGroupName) {
            arrayOfPath.push(childGroupName);
            return arrayOfPath;
        } else {
            var childGroups = groupObject.getGroups();
            if (childGroups.length !== 0) {
                arrayOfPath = searchGroupInGroupHierarchyRecursion(groupObject, childGroupName, arrayOfPath);
                if (arrayOfPath.length === 0) {
                    break;
                }
                arrayOfPath.push(groupObject.getName());
            }
        }
    }
    return arrayOfPath;
}
//=========================================================
// printTree
//=========================================================
function printTree() {
    var str = "";
    var headNumOfChildren = head.getGroups().length;
    console.log("|---->\\(" + head.getName() + ")="+headNumOfChildren);
    var res = printTreeRecursion (head, str);
    return res;
}
//---------------------------------------------------------

function printTreeRecursion(parentObject, str) {
    str+="      ";
    var firstLevelChildrenOfParentGroup = parentObject.getGroups();
    for (var i = 0; i < firstLevelChildrenOfParentGroup.length; i++) {
        var child = firstLevelChildrenOfParentGroup[i];
        var usersArray = child.getUsers();
        if (usersArray.length !== 0) {
            console.log(str + "|---->\\(" + child.getName() + ")="+usersArray.length)
            for (var user of usersArray) {
                console.log(str + "|     |---->(" + user.getName() + ")");
            }
            console.log(str + "|");
        } else {
            var groupObject = child;
            var groupName = groupObject.getName();
            var groupNumOfChildren = groupObject.getGroups().length;
            console.log(str + "|---->\\(" + groupName + ")="+groupNumOfChildren);
            printTreeRecursion(child, str);
        }
    }
}