const userFuncs = require('./users.js');
const groupFuncs = require('./groups.js');

// Tree Head
const head = groupFuncs.createNewGroup("General");

//a 'virtual' group is created if you want to add a groups with a name that already exists in the tree
// it will create a new group and then copy all the properties from the 'original' group
var virtualGroupsDictionary = {};

//=========================================================
module.exports = {
    addUserToGroup:addUserToGroup,
    removeUserFromGroup:removeUserFromGroup,
    addGroupToGroup:addGroupToGroup,
    removeGroupFromGroup:removeGroupFromGroup,
    searchUserInGroupHierarchy:searchUserInGroupHierarchy,
    searchGroupInGroupHierarchy:searchGroupInGroupHierarchy,
    printTree:printTree,
};
//=========================================================
// createVirtualGroup
//=========================================================
function createVirtualGroup(originalGroupObject) {
    //create virtual group
    var originalGroupName = originalGroupObject.getGroupName();
    var virtualGroupObject = groupFuncs.createNewGroup(originalGroupName);

    //copy all properties from original group to virtual group
    virtualGroupObject.setGroups(originalGroupObject.getGroups());
    virtualGroupObject.setUsers(originalGroupObject.getUsers());

    //add to virtualGroupsDictionary
    var VirtualGroupID = virtualGroupObject.getID();
    var virtualGroupName = virtualGroupObject.getGroupName();
    virtualGroupsDictionary[VirtualGroupID] = virtualGroupName;

    return virtualGroupObject;
}
//=========================================================
// addUserToGroup
//=========================================================
function addUserToGroup(groupName, username){

    //Don't allow adding users to head (only allow adding groups to head)
    if (groupName === head.getGroupName()) {
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
        if (listOfUsersInGroup[i].getUserName() === username) {
            return false;
        }
    }

    //Add user
    var res = groupObject.addUser(userObject);
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
    for (var i = 0; i < childrenOfParentGroupObject.length; i++) {
        if (childrenOfParentGroupObject[i].getUserName() === username) {
            groupObject.removeUser(username);
            return true;
        }
    }
    return false;
}
//=========================================================
// addGroupToGroup
//=========================================================
function addGroupToGroup(parentGroupName, childGroupName) {

    // Never allow making the head node a child of another group
    if (childGroupName === head.getGroupName()) {
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
    for (var i = 0; i < listOfGroupsInGroup.length; i++) {
        if (listOfGroupsInGroup[i].getGroupName() === childGroupName) {
            return false;
        }
    }

    //This condition helps verify that groups are not pointing each other across hierarchy
    //note that 1nd argument is a string and 2st argument is a reference to an object
    var res = areGroupsPointingEachOther(parentGroupName, childGroupObject);
    if (res) {
        return false;
    }

    // Handle case when you want to add groups with a name that already exists in the tree
    res = searchGroupInGroupHierarchy(childGroupName);
    if (res.length !== 0) {
        // Override reference
        childGroupObject = createVirtualGroup(childGroupObject);
    }

    //Add group
    res = parentGroupObject.addGroup(childGroupObject);
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
    for (var i = 0; i < childrenOfParentGroupObject.length; i++) {
        if (childrenOfParentGroupObject[i].getGroupName() === childGroupName) {
            parentGroupObject.removeGroup(childGroupName);
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
    arrayOfPath = searchGroupInGroupHierarchyRecursion(head, childGroupName, arrayOfPath);
    if (arrayOfPath.length !== 0) {
        arrayOfPath.push(head.getGroupName());
    }
    return arrayOfPath;
}
//---------------------------------------------------------

function searchGroupInGroupHierarchyRecursion(parentObject, childGroupName, arrayOfPath){
    var firstLevelChildrenOfParentGroup = parentObject.getGroups();
    for (var i=0 ; i < firstLevelChildrenOfParentGroup.length; i++) {
        var groupObject = firstLevelChildrenOfParentGroup[i];
        if (groupObject.getGroupName() === childGroupName) {
            arrayOfPath.push(childGroupName);
            break;
        } else {
            var childGroups = groupObject.getGroups();
            if (childGroups.length !== 0) {
                arrayOfPath = searchGroupInGroupHierarchyRecursion(groupObject, childGroupName, arrayOfPath);
                if (arrayOfPath.length === 0) {
                    break;
                }
                arrayOfPath.push(groupObject.getGroupName());
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
    console.log("|---->\\" + head.getGroupName() + "(GID " + head.getID() + ") "+headNumOfChildren);
    printTreeRecursion (head, str);
}
//---------------------------------------------------------

function printTreeRecursion(parentObject, str) {
    str+="      ";
    var firstLevelChildrenOfParentGroup = parentObject.getGroups();

    //print groups
    for (var i = 0; i < firstLevelChildrenOfParentGroup.length; i++) {
        var child = firstLevelChildrenOfParentGroup[i];

        //if we reached leafs
        var usersArray = child.getUsers();
        if (usersArray.length !== 0) {
            console.log(str + "|---->\\" + child.getGroupName() + "(GID " + child.getID() + ") "+usersArray.length);

            //print users
            for (var j=0; j<usersArray.length; j++) {
                var aUser = usersArray[j];
                console.log(str + "|     |---->" + aUser.getUserName() + "(UID " + aUser.getID() + ")");
            }
            console.log(str + "|");

        // if we havn't reached leafs yet
        } else {
            var groupObject = child;
            var groupName = groupObject.getGroupName();
            var groupNumOfChildren = groupObject.getGroups().length;
            console.log(str + "|---->\\" + groupName + "(GID " + child.getID() + ") "+groupNumOfChildren);
            printTreeRecursion(child, str);
        }
    }
}