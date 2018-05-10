const Group = require('./group.js');
//========================================================
// Array of 'Group' Objects
var listOfAllGroupObjects = [];
// this list is used by 'generateGroupID' function to check for available IDs
var IDsAndGroupObjectsDictionary = {};
// list of usernames and their various group parents
// example: {user1:{group1-ID:true, group2-ID:true}, user2:{group1-ID:true}}
// var listOfUserGroupParents = {};
//========================================================
module.exports = {
    getListOfAllGroupObjects:getListOfAllGroupObjects,
    getGroupObjectAccordingToID:getGroupObjectAccordingToID,
    createNewGroup:createNewGroup,
    cloneGroupWithDifferentID:cloneGroupWithDifferentID,
    removeGroupFromList:removeGroupFromList,
    // getUserGroupParents:getUserGroupParents,
    // updateListOfUserGroupParentsOnAdding,updateListOfUserGroupParentsOnAdding,
    // updateListOfUserGroupParentsOnRemoval:updateListOfUserGroupParentsOnRemoval,
};
//=========================================================
function getListOfAllGroupObjects() {
    return listOfAllGroupObjects;
}
//=========================================================
function generateGroupID() {
    for (var ID=0; ID < Number.MAX_VALUE; ID++)
    if (!IDsAndGroupObjectsDictionary[ID]) {
        return ID;
    }
    // new ID numbers are not available(reached the maximum of the ES5 'Number')
    return -1;
}
//=========================================================
function getGroupObjectAccordingToID(GroupID) {
    if (!IDsAndGroupObjectsDictionary[GroupID]) {
        return null;
    }
    // if ID exist
    var groupObject =  IDsAndGroupObjectsDictionary[GroupID];
    return groupObject;
}
//========================================================
function createNewGroup(groupName) {
    //don't allow to create groups without a group name
    if (groupName==="") {
        return null;
    }
    // generate group ID
    var groupID = generateGroupID();
    if (groupID === -1) {
        return null;
    }
    // create new group
    var newGroup = new Group(groupID, groupName);
    // push new group object to list
    listOfAllGroupObjects.push(newGroup);
    // add new group object ID to dictionary
    IDsAndGroupObjectsDictionary[groupID] = newGroup;

    return newGroup;
}
//========================================================
function cloneGroupWithDifferentID(groupObject) {
    var childGroupName = groupObject.getGroupName();
    //crateNewGroup function will assign a new ID
    var newGroup = createNewGroup(childGroupName);
    //copy properties
    var groupObjectChildUsers = groupObject.getUsers();
    newGroup.setUsers(groupObject.getUsers());
    newGroup.setGroups(groupObject.getGroups());

    // update 'listOfUserGroupParents' for each child user with new group ID
    for (var i=0; i<groupObjectChildUsers.length; i++) {
        var userObject = groupObjectChildUsers[i];
        //update per each username key
        //updateListOfUserGroupParentsOnAdding(groupObject, userObject);
    }
    return newGroup;
}
//=========================================================
function removeGroupFromList(groupObjectToRemove) {
    for(var i=0; i<listOfAllGroupObjects.length; i++) {
        // verify 'groupObjectToRemove' is in list
        if (listOfAllGroupObjects[i] === groupObjectToRemove){

            // Disconnect groupObject from all its variables
            // so garbage collector could handle it
            groupObjectToRemove.setGroups([]);
            groupObjectToRemove.setUsers([]);

            // Delete an array member from list
            listOfAllGroupObjects.splice(i,1);

            var groupID = groupObjectToRemove.getID();
            var groupObjectChildUsers = groupObjectToRemove.getUsers();
            // update 'listOfUserGroupParents' for each child user with new group ID
            for (var i=0; i<groupObjectChildUsers.length; i++) {
                var username = groupObjectChildUsers[i].getUserName();
                //update per each username key
                //updateListOfUserGroupParentsOnRemoval(username, groupID);
            }

            // remove group Object from ID list used by generate ID function
            delete IDsAndGroupObjectsDictionary[groupObjectToRemove.getID()];

            return true;
        }
    }
    return false;
}
// //=========================================================
// function getUserGroupParents(userObject) {
//     var res = listOfUserGroupParents[userObject.getUserName()];
//     if (!res) {
//         return null;
//     }
//     return res;
// }
// //========================================================
// function updateListOfUserGroupParentsOnAdding(groupObject, userObject) {
//     var innerObject = listOfUserGroupParents[userObject.getUserName()];
//     // if a user does not exist in the list
//     if (!innerObject) {
//         var innerObject = {};
//         innerObject[groupObject.getID()] = true;
//         //then add new user and new parent group
//         listOfUserGroupParents[userObject.getUserName()] = innerObject;
//         return;
//     }
//     // if the user exist in the list then add a new parent group
//     innerObject[groupObject.getID()] = true;
//     listOfUserGroupParents[userObject.getUserName()] = innerObject;
// }
// //========================================================
// function updateListOfUserGroupParentsOnRemoval(groupObject, userObject) {
//     var innerObject = listOfUserGroupParents[userObject.getUserName()];
//     // if a user does not exist in the list
//     if (!innerObject) {
//         var innerObject = {};
//         innerObject[groupObject.getID()] = true;
//         //then add new user and new parent group
//         listOfUserGroupParents[userObject.getUserName()] = innerObject;
//         return;
//     }
//     // if the user exist in the list then add a new parent group
//     innerObject[groupObject.getID()] = true;
//     listOfUserGroupParents[userObject.getUserName()] = innerObject;
// }