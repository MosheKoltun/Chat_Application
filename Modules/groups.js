const Group = require('./group.js');
//========================================================
// Array of 'Group' Objects
var listOfAllGroupObjects = [];
// this list is used by 'generateGroupID' function to check for available IDs
var IDsAndGroupObjectsDictionary = {};
//========================================================
module.exports = {
    getListOfAllGroupObjects:getListOfAllGroupObjects,
    getGroupObjectAccordingToID:getGroupObjectAccordingToID,
    createNewGroup:createNewGroup,
    cloneSubTreeRecursion:cloneSubTreeRecursion,
    removeGroupRecursion:removeGroupRecursion,
    removeGroupNotInTree:removeGroupNotInTree,
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
    var res = IDsAndGroupObjectsDictionary[GroupID];
    if (!res) {
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
//=========================================================
// removeGroupNotInTree
//=========================================================
function removeGroupNotInTree(groupIDToRemove) {
    //get group reference according to group ID
    var groupObjectToRemove = IDsAndGroupObjectsDictionary[groupIDToRemove];
    //check if group exist
    if (groupObjectToRemove === null){
        return false;
    }
    for(var i=0; i<listOfAllGroupObjects.length; i++) {
        // verify 'groupObjectToRemove' is in list
        if (listOfAllGroupObjects[i] === groupObjectToRemove){
            // Disconnect groupObject from all its variables
            // so garbage collector could handle it
            groupObjectToRemove.setGroups([]);
            groupObjectToRemove.setUsers([]);
            // Delete an array member from list
            listOfAllGroupObjects.splice(i,1);
            // remove group Object from ID list used by generate ID function
            delete IDsAndGroupObjectsDictionary[groupObjectToRemove.getID()];
            return true;
        }
    }
    return false;
}
//=========================================================
// cloneSubTreeRecursion
//=========================================================
function cloneSubTreeRecursion(root) {
    if (root !== null) {
        var copyNode = createNewGroup(root.getGroupName());

        var rootChildren = root.getGroups();
        for (var i = 0; i < rootChildren.length; i++) {
            copyNode.addGroup(cloneSubTreeRecursion(rootChildren[i]));
            copyNode.addUser(rootChildren[i].getUsers());
        }
    }
    return copyNode;
}
//=========================================================
// removeGroupRecursion
//=========================================================
//this function should only be called from 'removeGroupHierarchy' in 'tree.js'
function removeGroupRecursion(groupToRemoveID) {
    // get reference of group to remove from 'listOfAllGroupObjects' according to ID
    var groupToRemove = null;
    for(var i=0; i<listOfAllGroupObjects.length; i++) {
        if (listOfAllGroupObjects[i].getID() === groupToRemoveID) {
            // override null reference
            groupToRemove = listOfAllGroupObjects[i];
            // Delete an array member from list
            listOfAllGroupObjects.splice(i,1);
            // remove group Object from ID list used by generate ID function
            delete IDsAndGroupObjectsDictionary[groupToRemove.getID()];
            break;
        }
    }
    //check if group exists
    if (groupToRemove === null) {
        return null;
    }
    var children = groupToRemove.getGroups();
    for(var j=0; j<children.length; j++) {
        removeGroupRecursion(children[j].getID());
        // Disconnect groupObject from all its variables
        // so garbage collector could handle it
        children[j].setGroups([]);
        children[j].setUsers([]);
    }
    groupToRemove.setGroups([]);
    groupToRemove.setUsers([]);
    return groupToRemove;
}