const Group = require('./group.js');
//========================================================
// Array of 'Group' Objects
var groupObjectList = [];
//========================================================
module.exports = {
    createNewGroup:createNewGroup,
    getListOfGroupNames:getListOfGroupNames,
    doesGroupExist:doesGroupExist,
    removeGroup:removeGroup,
};
//========================================================
function createNewGroup(GroupName) {
    var newGroup = new Group(GroupName);
    groupObjectList.push(newGroup);
    return newGroup;
}
//========================================================
function doesGroupExist(GroupName) {
    if (groupObjectList.length > 0) {
        for (var i = 0; i < groupObjectList.length; i++) {
            if (groupObjectList[i].getName() === GroupName) {
                return true; //
                // If user exist. Return from function immediately
            }
        }
    }
    return false;
    // If group does not exist
    // or in case 'groupObjectList' is empty
}
//=========================================================
function getListOfGroupNames() {
    //console.log("inside getListOfGroupNames")
    var groupsList = [];
    if (groupObjectList.length > 0) {
        for (var i = 0; i < groupObjectList.length; i++) {
            groupsList.push(groupObjectList[i].getName());
        }
    }
    //console.log("groupsList = " + groupsList);
    return groupsList;
}
//=========================================================
function removeGroup(GroupName) {
    for(var i=0; i<groupObjectList.length; i++) {
        if (groupObjectList[i].getName() === GroupName){
            groupObjectList.splice(i,1);
            // Delete an array member
            return true;
        }
    }
    return false;
}