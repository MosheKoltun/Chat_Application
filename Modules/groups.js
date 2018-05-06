const Group = require('./group.js');
//========================================================
// Array of 'Group' Objects
var listOfAllGroupObjects = [];
//========================================================
module.exports = {
    getGroupObjectList:getGroupObjectList,
    createNewGroup:createNewGroup,
    getListOfGroupNames:getListOfGroupNames,
    doesGroupExist:doesGroupExist,
    removeGroup:removeGroup,
};
//=========================================================
function getGroupObjectList() {
    return listOfAllGroupObjects;
}
//========================================================
function createNewGroup(groupName) {
    if (groupName==="") {
        return null;
    }

    // check that group name is unique
    var groupObject = doesGroupExist(groupName);
    if (groupObject !== null) {
        return null;
    }

    var newGroup = new Group(groupName);
    listOfAllGroupObjects.push(newGroup);
    return newGroup;
}
//========================================================
function doesGroupExist(groupName) {
    if (listOfAllGroupObjects.length === 0) {
        return null;
        // in case 'listOfAllGroupObjects' is empty
    }
    for (var i = 0; i < listOfAllGroupObjects.length; i++) {
        if (listOfAllGroupObjects[i].getName() === groupName) {
            return listOfAllGroupObjects[i]; //
            // If user exist. Return from function immediately
        }
    }
    return null;
    // If group does not exist
}
//=========================================================
function getListOfGroupNames() {
    var groupsList = [];
    if (listOfAllGroupObjects.length > 0) {
        for (var i = 0; i < listOfAllGroupObjects.length; i++) {
            groupsList.push(listOfAllGroupObjects[i].getName());
        }
    }
    return groupsList;
}
//=========================================================
function removeGroup(groupName) {
    for(var i=0; i<listOfAllGroupObjects.length; i++) {
        if (listOfAllGroupObjects[i].getName() === groupName){
            listOfAllGroupObjects.splice(i,1);
            // Delete an array member
            return true;
        }
    }
    return false;
}