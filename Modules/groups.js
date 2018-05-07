const Group = require('./group.js');
//========================================================
// Array of 'Group' Objects
var listOfAllGroupObjects = [];
var IDsAndGroupsDictionary = {};
//========================================================
module.exports = {
    getGroupObjectList:getGroupObjectList,
    createNewGroup:createNewGroup,
    getListOfGroupNames:getListOfGroupNames,
    doesGroupExist:doesGroupExist,
    removeGroup:removeGroup,
};
//=========================================================
function generateGroupID() {
    for (var ID=0; ID < Number.MAX_VALUE; ID++)
    if (!IDsAndGroupsDictionary[ID]) {
        return ID;
    }
    // new ID numbers are not available(reached the maximum of the ES5 'Number')
    return -1;
}
//=========================================================
function getIDsWithSameGroupName(groupName) {
    var arr = [];
    for (var ID of IDsAndGroupsDictionary) {
        if (IDsAndGroupsDictionary[ID].getName() === groupName) {
            arr.push(ID);
        }
    }
    return arr;
}
//=========================================================
function getGroupObjectList() {
    return listOfAllGroupObjects;
}
//========================================================
function createNewGroup(groupName) {
    if (groupName==="") {
        return null;
    }

    var groupID = generateGroupID();
    if (groupID === -1) {
        return false;
    }

    var newGroup = new Group(groupID, groupName);

    listOfAllGroupObjects.push(newGroup);
    IDsAndGroupsDictionary[groupID] = newGroup;

    return newGroup;
}
//========================================================
function doesGroupExist(groupName) {
    // in case 'listOfAllGroupObjects' is empty
    if (listOfAllGroupObjects.length === 0) {
        return null;
    }

    // If group exist. Return from function immediately
    for (var i = 0; i < listOfAllGroupObjects.length; i++) {
        var groupObject = listOfAllGroupObjects[i];
        if (groupObject.getGroupName() === groupName) {
            return groupObject; //
        }
    }

    // If group does not exist
    return null;
}
//=========================================================
function getListOfGroupNames() {
    var groupsList = [];
    if (listOfAllGroupObjects.length > 0) {
        for (var i = 0; i < listOfAllGroupObjects.length; i++) {
            groupsList.push(listOfAllGroupObjects[i].getGroupName());
        }
    }
    return groupsList;
}
//=========================================================
function removeGroup(groupName) {
    for(var i=0; i<listOfAllGroupObjects.length; i++) {
        var groupObject = listOfAllGroupObjects[i];
        if (groupObject.getGroupName() === groupName){

            // Disconnect groupObject from all its variables
            // so garbage collector could handle it
            groupObject.groups = null;
            groupObject.users = null;

            // Delete an array member from list
            listOfAllGroupObjects.splice(i,1);

            // remove from ID list
            delete IDsAndGroupsDictionary[groupObject.getID()];

            return true;
        }
    }
    return false;
}