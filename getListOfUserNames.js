
function getListOfUserNames() {
    var listOfUsernames = [];

    for(var i=0; i<usersList.length; i++) {
        listOfUsernames.push(usersList[i].getName());
    }

    return listOfUsernames;
}

//===========================================================================
module.exports =  getListOfUserNames;
