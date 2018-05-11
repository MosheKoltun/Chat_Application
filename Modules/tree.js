const userFuncs = require('./users.js');
const groupFuncs = require('./groups.js');

// Tree Head
const head = groupFuncs.createNewGroup("General");

// global variable to temporary hold 'path' of group search result in tree
arrayOfGroupSearchResults = [];

// global variable to temporary hold 'group parents' of user (search result in tree)
arrayOfUserSearchResults = [];

//=========================================================
module.exports = {
    doesUserExist:userFuncs.doesUserExist,
    getListOfAllUserObjects:userFuncs.getListOfAllUserObjects,
    createNewUser:userFuncs.createNewUser,
    removeUser:userFuncs.removeUser,
    updateUsername:userFuncs.updateUsername,
    updateUserAge:userFuncs.updateUserAge,
    getListOfAllGroupObjects:groupFuncs.getListOfAllGroupObjects,
    createNewGroup:groupFuncs.createNewGroup,
    removeGroupNotInTree:groupFuncs.removeGroupNotInTree,
    removeGroupHierarchy:removeGroupHierarchy,
    addUserToGroup:addUserToGroup,
    removeUserFromGroup:removeUserFromGroup,
    addGroupToGroup:addGroupToGroup,
    flattenGroup:flattenGroup,
    searchGroupInTreeReturnPath:searchGroupInTreeReturnPath,
    searchUserInTreeReturnParents:searchUserInTreeReturnParents,
    printTree:printTree,
};
//=========================================================
// addUserToGroup
//=========================================================
function addUserToGroup(groupID, userID){
    // check if parent group exists
    var groupObject = groupFuncs.getGroupObjectAccordingToID(groupID);
    if (groupObject === null) {
        return false;
    }
    // check if user exists
    var userObject = userFuncs.getUserObjectAccordingToID(userID);
    if (userObject === null) {
        return false;
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
    var res = groupObject.addUser(userObject);
    return res;
}
//=========================================================
// removeUserFromGroup
//=========================================================
function removeUserFromGroup(groupID, userID){
    // check if parent group exists
    var groupObject = groupFuncs.getGroupObjectAccordingToID(groupID);
    if (groupObject === null) {
        return null;
    }
    // check if user exists
    var userObject = userFuncs.getUserObjectAccordingToID(userID);
    if (userObject === null) {
        return null;
    }
    //remove user
    var childrenOfParentGroupObject = groupObject.getUsers();
    for (var i = 0; i < childrenOfParentGroupObject.length; i++) {
        if (childrenOfParentGroupObject[i] === userObject) {
            // notice Group.removeUser return null if succeeded
            var res = groupObject.removeUser(userObject);
            if (res === null) {
                return groupObject;
            } else {
                return null;
            }
        }
    }
    return null;
}
//=========================================================
// addGroupToGroup
//=========================================================
function addGroupToGroup(parentGroupID, childGroupID) {
    // check if parent group exists
    var parentGroupObject = groupFuncs.getGroupObjectAccordingToID(parentGroupID);
    if (parentGroupObject === null) {
        return null;
    }
    // check if child group exists
    var childGroupObject = groupFuncs.getGroupObjectAccordingToID(childGroupID);
    if (childGroupObject === null) {
        return null;
    }
    // This line protects from making the tree head a child of another group
    if (childGroupObject === head) {
        return null;
    }
    //Handle cases when group object already exist in tree
    if (searchGroupRecursion(head, childGroupObject) !== null) {
        //clone entire subtree
        //and override object reference with clone reference
        childGroupObject = groupFuncs.cloneSubTreeRecursion(childGroupObject);
    }
    //Enable adding a group inside a group of users
    var usersOfParentGroup = parentGroupObject.getUsers();
    if (usersOfParentGroup.length !== 0) {
        parentGroupObject.setUsers([]);
        var containerForUsers = groupFuncs.createNewGroup("others");
        containerForUsers.setUsers(usersOfParentGroup);
        parentGroupObject.addGroup(containerForUsers);
    }
    //Add group
    var res = parentGroupObject.addGroup(childGroupObject);
    if (!res) {
        return null;
    }
    return parentGroupObject;
    //return childGroupObject;
}
//=========================================================
// removeGroupHierarchy
//=========================================================
//remove all groups in sub tree to avoid memory leakage
function removeGroupHierarchy (groupToRemoveID) {
    // get group Object and check if it exists
    var groupToRemove = groupFuncs.getGroupObjectAccordingToID(groupToRemoveID);
    if (groupToRemove === null) {
        return null;
    }
    // find group parent
    var groupParent = findGroupParent(groupToRemove);
    if (groupParent === null) {
        return false;
    }
    //remove all groups in sub tree to avoid memory leakage
    var res = groupFuncs.removeGroupRecursion(groupToRemoveID);
    if (res === null) {
        return false;
    }
    // remove reference of group inside parent
    groupParent.removeGroup(groupToRemove);
    return true;
}
//=========================================================
// findGroupParent
//=========================================================
function findGroupParent(childGroup) {
    // search for group parent in tree
    var path = searchGroupInTreeReturnPath(childGroup.getID());
    if (path.length === 0) {
        return null;
    }
    // first element of the returned array is the group parent
    var groupParent = path[0];
    return groupParent;
}
//=========================================================
// flattenGroup
//=========================================================
function flattenGroup(groupIDToFlatten) {
    // get group Object and check if it exists
    var groupToFlatten = groupFuncs.getGroupObjectAccordingToID(groupIDToFlatten);
    if (groupToFlatten === null) {
        return null;
    }
    // get group parent and check if exists
    var groupParent = findGroupParent(groupToFlatten);
    if (groupParent === null) {
        return null;
    }
    // handle case when groupToFlatten is a users group
    var childrenUsers = groupToFlatten.getUsers();
    if (childrenUsers.length !== 0) {
        // don't allow flattening users group if groupToFlatten have siblings
        if (groupParent.getGroups().length !== 1) {
            return null;
        }
        groupParent.removeGroup(groupToFlatten);
        for (var i=0; i < childrenUsers.length; i++) {
            groupParent.addUser(childrenUsers[i]);
        }
    }
    // handle case when groupToFlatten is a groups group
    var childrenGroups = groupToFlatten.getGroups();
    if (childrenGroups.length !== 0) {
        groupParent.removeGroup(groupToFlatten);
        for (var j=0; j < childrenGroups.length; j++) {
            groupParent.addGroup(childrenGroups[j]);
        }
    }
    // remove group to avoid memory leakage
    groupFuncs.removeGroupNotInTree(groupIDToFlatten);
    return groupParent;
}
//=========================================================
// searchUserInTreeReturnParents
//=========================================================
// this function unlike searchGroupInTreeReturnPath will return an array
// of groups parents of the user instead of path
function searchUserInTreeReturnParents(userIDToSearch) {
    // get user Object and check if it exists
    var userToSearch = userFuncs.getUserObjectAccordingToID(userIDToSearch);
    if (userToSearch === null) {
        return [];
    }
    //clearing global variable
    arrayOfUserSearchResults.length = 0;
    //calling the recursive search function
    searchUserRecursion(head, userToSearch);
    // return path as array with group objects
    return arrayOfUserSearchResults;
}
//---------------------------------------------------------
function searchUserRecursion(root, userToSearch) {
    var users = root.getUsers();
    for (var j=0; j<users.length; j++) {
        if (users[j] === userToSearch) {
            //found
            //push to array new groups parents of the user
            arrayOfUserSearchResults.push(root);
            //do not return after found
            //continue to search for more group parents
        }
    }
    var childrenOfRoot = root.getGroups();
    for (var i = 0; i < childrenOfRoot.length; i++) {
        var groupObject = childrenOfRoot[i];
        var res = searchUserRecursion(groupObject, userToSearch);
        if (res !== null) {
            return res;
        }
    }
    return null;
}
//=========================================================
// searchGroupInTreeReturnPath
//=========================================================
function searchGroupInTreeReturnPath(groupIDToSearch) {
    // get group Object and check if it exists
    var groupToSearch = groupFuncs.getGroupObjectAccordingToID(groupIDToSearch);
    if (groupToSearch === null) {
        return [];
    }
    //clearing global variable
    arrayOfGroupSearchResults.length = 0;
    //calling the recursive search function
    searchGroupRecursion(head, groupToSearch);
    // return path as array with group objects
    return arrayOfGroupSearchResults;
}
//---------------------------------------------------------
function searchGroupRecursion(root, groupToSearch) {
    if (root === groupToSearch) {
        //console.log("found");
        return root;
    } else {
        var childrenOfRoot = root.getGroups();
        for (var i = 0; i < childrenOfRoot.length; i++) {
            var groupObject = childrenOfRoot[i];
            var res = searchGroupRecursion(groupObject, groupToSearch);
            if (res !== null) {
                arrayOfGroupSearchResults.push(root);
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
    var numberOfChildren = head.getGroups().length;
    if (numberOfChildren === 0) {
        numberOfChildren = head.getUsers().length;
    }
    console.log("|---->\\ " + head.getGroupName() +
        "(GroupID " + head.getID() + ") " + numberOfChildren);
    printTreeRecursion(head, str);
}
//---------------------------------------------------------
function printTreeRecursion(root, str) {
    str += "      ";
    if (root !== null) {
        var rootChildren = root.getGroups();
        if (rootChildren.length !== 0) {
            for (var i = 0; i < rootChildren.length; i++) {
                console.log(str + "|---->\\ " + rootChildren[i].getGroupName() +
                    "(GroupID " + rootChildren[i].getID() + ") " + rootChildren.length);
                printTreeRecursion(rootChildren[i], str);
            }
        }
        else {
            var rootChildren = root.getUsers();
            if (rootChildren.length !== 0) {
                for (var i = 0; i < rootChildren.length; i++) {
                    console.log(str + "^----> " + rootChildren[i].getUserName() +
                        "(UserID " + rootChildren[i].getID() + ") " + rootChildren.length);
                }
            }
        }
    }
}