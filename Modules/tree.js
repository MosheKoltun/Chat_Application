const userFuncs = require('./users.js');
const groupFuncs = require('./groups.js');

// Tree Head
const head = groupFuncs.createNewGroup("General");

//=========================================================
module.exports = {
    doesUserExist:userFuncs.doesUserExist,
    getListOfAllUserObjects:userFuncs.getListOfAllUserObjects,
    getListOfAllGroupObjects:groupFuncs.getListOfAllGroupObjects,
    createNewUser:userFuncs.createNewUser,
    removeUser:userFuncs.removeUser,
    updateUsername:userFuncs.updateUsername,
    updateUserAge:userFuncs.updateUserAge,
    createNewGroup:groupFuncs.createNewGroup,
    removeGroupFromList:groupFuncs.removeGroupFromList,
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
function addUserToGroup(groupID, userID){
    // retrieve group objects from dictionary by group ID
    var groupObject = groupFuncs.getGroupObjectAccordingToID(groupID);
    // check if parent group exists
    if (groupObject === null) {
        return null;
    }
    // retrieve user objects from dictionary by group ID
    var userObject = userFuncs.getUserObjectAccordingToID(userID);
    // check if user exists
    if (userObject === null) {
        return null;
    }
    //Don't allow adding users to head (only allow adding groups to head)
    if (groupObject === head) {
        return false;
    }
    // Check that user is not already a child of that group
    var listOfUsersInGroup = groupObject.getUsers();
    for (var i=0; i < listOfUsersInGroup.length; i++) {
        if (listOfUsersInGroup[i] === userObject) {
            return false;
        }
    }
    //Add user
    var res = addUserAndUpdateListOfUserGroupParents(groupObject, userObject);

    return res;
}
//=========================================================
// removeUserFromGroup
//=========================================================
function removeUserFromGroup(groupID, userID){
    // retrieve group objects from dictionary by group ID
    var groupObject = groupFuncs.getGroupObjectAccordingToID(groupID);
    // check if parent group exists
    if (groupObject === null) {
        return null;
    }
    // retrieve user objects from dictionary by group ID
    var userObject = userFuncs.getUserObjectAccordingToID(userID);
    // check if user exists
    if (userObject === null) {
        return null;
    }
    //remove user
    var childrenOfParentGroupObject = groupObject.getUsers();
    for (var i = 0; i < childrenOfParentGroupObject.length; i++) {
        if (childrenOfParentGroupObject[i] === userObject) {
            //groupObject.removeUser(username);
            var res = removeUserAndUpdateListOfUserGroupParents(groupObject, userObject);
            return res;
        }
    }
    return null;
}
//=========================================================
// addGroupToGroup
//=========================================================
function addGroupToGroup(parentGroupID, childGroupID) {
    // retrieve group objects from dictionary by group ID
    var parentGroupObject = groupFuncs.getGroupObjectAccordingToID(parentGroupID);
    // check if parent group exists
    if (parentGroupObject === null) {
        return null;
    }
    // retrieve group objects from dictionary by group ID
    var childGroupObject = groupFuncs.getGroupObjectAccordingToID(childGroupID);
    // check if child group exists
    if (childGroupObject === null) {
        return null;
    }
    // Never allow making the head node a child of another group
    if (childGroupObject === head) {
        return null;
    }
    //Handle cases when group object already exist in tree
    //if (searchGroupInGroupHierarchy(childGroupObject).length !==0) {
    if (searchGroupInGroupHierarchy(childGroupObject) !== null) {
        //override variable with reference to object clone
        childGroupObject = groupFuncs.cloneGroupWithDifferentID(childGroupObject);
    }
    //Add group
    var res = parentGroupObject.addGroup(childGroupObject);
    if (!res) {
        return null;
    }
    return childGroupObject;
}
//=========================================================
// removeGroupFromGroup
//=========================================================
function removeGroupFromGroup(parentGroupID, childGroupID){
    // retrieve group objects from dictionary by group ID
    var parentGroupObject = groupFuncs.getGroupObjectAccordingToID(parentGroupID);
    // check if parent group exists
    if (parentGroupObject === null) {
        return null;
    }
    // retrieve group objects from dictionary by group ID
    var childGroupObject = groupFuncs.getGroupObjectAccordingToID(childGroupID);
    // check if child group exists
    if (childGroupObject === null) {
        return null;
    }
    //remove group
    var childrenOfParentGroupObject = parentGroupObject.getGroups();
    for (var i = 0; i < childrenOfParentGroupObject.length; i++) {
        if (childrenOfParentGroupObject[i] === childGroupObject) {
            //remove reference inside parent
            parentGroupObject.removeGroup(childGroupObject);
            return true;
        }
    }
    return false;
}
//=========================================================
// searchGroupInGroupHierarchy
//=========================================================
function searchGroupInGroupHierarchy(childGroupObject) {
    var res  = searchGroupInGroupHierarchyRecursion(head, childGroupObject);
    if (res !== null) {
        console.log(res.getID());
    }
    return res;
}
//---------------------------------------------------------
function searchGroupInGroupHierarchyRecursion(parentObject, childGroupObject) {
    if (parentObject === childGroupObject) {
        console.log("found!");
        return parentObject;
    } else {
        var firstLevelChildrenOfParentGroup = parentObject.getGroups();
        for (var i = 0; i < firstLevelChildrenOfParentGroup.length; i++) {
            var groupObject = firstLevelChildrenOfParentGroup[i];
            var res = searchGroupInGroupHierarchyRecursion(groupObject, childGroupObject);
            if (res !== null) {
                console.log(parentObject.getID());
                return res;
            }
        }
        return null;
    }
}
//=========================================================
// printTree
//=========================================================
function printTree() {
    var str = "";
    var headNumOfChildren = head.getGroups().length;
    console.log("|---->\\" + head.getGroupName() + "(GroupID " + head.getID() + ") "+headNumOfChildren);
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
            console.log(str + "|---->\\" + child.getGroupName() + "(GroupID " + child.getID() + ") "+usersArray.length);
            //print users
            for (var j=0; j<usersArray.length; j++) {
                var aUser = usersArray[j];
                console.log(str + "|     |---->" + aUser.getUserName() + "(UserID " + aUser.getID() + ")");
            }
            console.log(str + "|")
        // if we havn't reached leafs yet
        } else {
            var groupObject = child;
            var groupName = groupObject.getGroupName();
            var groupNumOfChildren = groupObject.getGroups().length;
            console.log(str + "|---->\\" + groupName + "(GroupID " + child.getID() + ") "+groupNumOfChildren);
            printTreeRecursion(child, str);
        }
    }
}
// //=========================================================
// function addUserAndUpdateListOfUserGroupParents(groupObject, userObject) {
//     var res = groupObject.addUser(userObject);
//     groupFuncs.updateListOfUserGroupParentsOnAdding(groupObject, userObject);
//     return res;
// }
// //=========================================================
// function removeUserAndUpdateListOfUserGroupParents(groupObject, userObject) {
//     var res = groupObject.removeUser(userObject);
//     groupFuncs.updateListOfUserGroupParentsOnRemoval(groupObject, userObject);
//     return res;
// }