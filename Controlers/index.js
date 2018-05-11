const treeFuncs = require('../Modules/tree.js');

const readline = require('readline');
//===========================================================================
var menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//===========================================================================
showMainMenu();

//===========================================================================
// showMainMenu
//===========================================================================
function showMainMenu() {
    console.clear();
    console.log(
        'Main menu      \n' +
        '===============\n' +
        '1 = Users Menu \n' +
        '2 = Groups Menu\n' +
        '3 = Chat Menu  \n' +
        '4 = Exit         '
    );
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': showUserMenu(); break;
            case '2': showGroupsMenu(); break;
            case '3': showChatMenu(); break;
            case '4': process.exit(); break;
            default: showMainMenu() /* show menu again if input does not match */;
        }
    });
}
//===========================================================================
// showUserMenu
//===========================================================================
function showUserMenu() {
    console.clear();
    console.log(
        'User Menu              \n' +
        '=======================\n' +
        '1 = Create New User    \n' +
        '2 = Remove User        \n' +
        '3 = Update User Profile\n' +
        '4 = Get List of Users  \n' +
        '5 = Go back to main      '
    );
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': createNewUserWithQuestion(); break;
            case '2': removeUserWithQuestion(); break;
            case '3': showUpdateUserProfileMenu(); break;
            case '4': printListOfUserNames(); break;
            case '5': showMainMenu(); break;
            default:  showUserMenu() /* show menu again if input does not match */;
        }
    });
}
//===========================================================================
// updateUserProfile
//===========================================================================
function showUpdateUserProfileMenu() {
    console.clear();
    console.log(
        'User Menu              \n' +
        '=======================\n' +
        '1 = Update Username    \n' +
        '2 = Update Age         \n' +
        '3 = Go back to User Menu      '
    );
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': updateUsernameWithQuestion(); break;
            case '2': updateUserAgeWithQuestion(); break;
            case '3': showUserMenu(); break;
            default:  showUpdateUserProfileMenu() /* show menu again if input does not match */;
        }
    });
}

//===========================================================================
// showGroupsMenu
//===========================================================================
function showGroupsMenu() {
    console.clear();
    console.log(
        'Groups Menu                     \n' +
        '================================\n' +
        '1 = Create New Group            \n' +
        '2 = Remove Group                \n' +
        '3 = Get List of Groups          \n' +
        '4 = Go back to main               '
    );
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1' : createNewGroupWithQuestion(); break;
            case '2' : removeGroupNotInTreeWithQuestion(); break;
            case '3' : printListOfGroupNames(); break;
            case '4': showMainMenu(); break;
            default: showGroupsMenu() /* show menu again if input does not match */;
        }
    });
}
//===========================================================================
// showChatMenu
//===========================================================================
function showChatMenu() {
    console.clear();
    console.log(
        'Chat Menu                     \n' +
        '================================\n' +
        '1 = Add User To Group           \n' +
        '2 = Remove User From Group      \n' +
        '3 = Add Group To Group          \n' +
        '4 = Remove Group From Group     \n' +
        '5 = Flatten Group               \n' +
        '6 = Print Tree of Group And Users\n' +
        '7 = Show Group Path (Search)    \n' +
        '8 = Show User Parents (Search)  \n' +
        '9 = Go back to main               '
    );
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': addUserToGroupWithQuestion(); break;
            case '2': removeUserFromGroupWithQuestion(); break;
            case '3': addGroupToGroupWithQuestion(); break;
            case '4': removeGroupHierarchyWithQuestion(); break;
            case '5': break;
            case '6': printGroupsUsersDisplayTree(); break;
            case '7': break;
            case '8': break;
            case '9': showMainMenu(); break;
            default: showChatMenu() /* show menu again if input does not match */;
        }
    });
}
//===========================================================================
// createNewUserWithQuestion
//===========================================================================
function createNewUserWithQuestion() {
    var userInput = {};
    console.clear();

    menu.question('Please Enter Username:\n', processInput1);

    function processInput1(input) {
        if (input === "") {
            menu.question('Error: Field is empty!\n' +
                'Please enter username again:\n', processInput1);
        }
    var res = treeFuncs.doesUserExist(input);
        if (res !== null) {
            menu.question('Error: Username already exist!\n' +
                'Please enter username again:\n', processInput1);
        } else {
            userInput.username = input;
            menu.question('Please Enter Password:\n', processInput2);
        }
    }

    function processInput2(input) {
        userInput.password=input;
        menu.question('Please Enter Age:\n', processInput3);
    }

    function processInput3(input) {
        userInput.age=input;
        treeFuncs.createNewUser(userInput.username, userInput.password, userInput.age);
        showUserMenu();
    }
}
//===========================================================================
// removeUserWithQuestion
//===========================================================================
function removeUserWithQuestion() {
    console.clear();
    menu.question('Please enter username to be removed:\n', processInput1);

    function processInput1(input) {
        var res = treeFuncs.removeUser(input);
        if (res){
            console.log('Username was successfully removed!');
        } else {
            console.log('Username does not exist!');
        }
        menu.question('Press any key to continue...', processInput2);
    }

    function processInput2() {
        showUserMenu();
    }
}
//===========================================================================
// updateUsernameWithQuestion
//===========================================================================
function updateUsernameWithQuestion() {
    console.clear();
    menu.question('Please enter old username:\n', processInput1);
    var oldUsername = null;

    function processInput1(input) {
        oldUsername = input;
        var userObject = treeFuncs.doesUserExist(input);
        if (userObject!=null) {
            menu.question('Please enter new username:\n', processInput2);
        } else {
            console.log('Username does not exist!');
            menu.question('Press any key to continue...', processInput3);
        }
    }

    function processInput2(input) {
        var newUsername = input;
        treeFuncs.updateUsername(oldUsername, newUsername);
        console.log('Username was successfully changed!');
        menu.question('Press any key to continue...', processInput3);
    }

    function processInput3() {
        showUpdateUserProfileMenu();
    }
}
//===========================================================================
// updateUserAgeWithQuestion
//===========================================================================
function updateUserAgeWithQuestion(){
    console.clear();
    menu.question('Please enter username:\n', processInput1);
    var username = null;

    function processInput1(input) {
        username = input;
        var userObject = treeFuncs.doesUserExist(input);
        if (userObject!=null) {
            menu.question('Please enter new age:\n', processInput2);
        } else {
            console.log('Username does not exist!');
            menu.question('Press any key to continue...', processInput3);
        }
    }
    function processInput2(input) {
        var newUserAge = input;
        treeFuncs.updateUserAge(username, newUserAge);
        console.log('User age was successfully changed!');
        menu.question('Press any key to continue...', processInput3);
    }

    function processInput3() {
        showUpdateUserProfileMenu();
    }
}
//===========================================================================
// printListOfUserNames
//===========================================================================
function printListOfUserNames() {
    console.clear();
    var listOfAllUserObjects = treeFuncs.getListOfAllUserObjects();
    for(var i=0; i<listOfAllUserObjects.length; i++) {
        var username = listOfAllUserObjects.getUserName();
        var userID = listOfAllUserObjects.getID();
        console.log(userID + " : " + username);
    }
    menu.question('Press any key to continue...', processInput1);

    function processInput1() {
        showUserMenu();
    }
}
//===========================================================================
// createNewGroupWithQuestion
//===========================================================================
function createNewGroupWithQuestion() {
    console.clear();
    menu.question('Please Enter Group Name:\n', processInput1);

    function processInput1(input) {
        if (input === "") {
            menu.question('Field is empty. Please enter group name again:\n', processInput1);
        } else {
            console.clear();
            var res = treeFuncs.createNewGroup(input);
            if (res===null) {
                console.log('Error Group name already exists!');
                menu.question('Please Enter Group Name:\n', processInput1);
            }
            showGroupsMenu();
        }
    }
}
//===========================================================================
// removeGroupHierarchyWithQuestion
//===========================================================================
function removeGroupNotInTreeWithQuestion() {
    console.clear();

    menu.question('Please enter ID of group to remove:\n', processInput1);

    function processInput1(groupToRemoveID) {

        var res = treeFuncs.removeGroupNotInTree(groupToRemoveID);
        if (!!res){
            console.log('Group was successfully removed!');
        } else {
            console.log('Failed!');
        }
        menu.question('Press any key to continue...', processInput3);
    }

    function processInput3() {
        showChatMenu();
    }
}
//===========================================================================
// printListOfGroupNames
//===========================================================================
function printListOfGroupNames() {
    console.clear();
    var listOfAllGroupObjects = treeFuncs.getListOfAllGroupObjects();
    for(var i=0; i<listOfAllGroupObjects.length; i++) {
        console.log(listOfAllGroupObjects[i].getGroupName());
    }
    menu.question('Press any key to continue...', processInput1);

    function processInput1() {
        showGroupsMenu();
    }
}
//===========================================================================
// addUserToGroupWithQuestion
//===========================================================================
function addUserToGroupWithQuestion() {
    console.clear();
    var groupID = null;
    var userID = null;

    menu.question('Please enter group ID:\n', processInput1);

    function processInput1(input) {
        groupID = input;
        menu.question('Please enter user ID:\n', processInput2);
    }

    function processInput2(input) {
        userID = input;

        var res = treeFuncs.addUserToGroup(groupID, userID);
        if (res){
            console.log('User was successfully added to the group!');
        } else {
            console.log('Failed!');
        }
        menu.question('Press any key to continue...', processInput3);
    }

    function processInput3() {
        showChatMenu();
    }
}
//===========================================================================
// removeUserFromGroupWithQuestion
//===========================================================================
function removeUserFromGroupWithQuestion() {
    console.clear();
    var groupID = null;
    var userID = null;

    menu.question('Please enter group ID:\n', processInput1);

    function processInput1(input) {
        groupID = input;
        menu.question('Please enter user ID:\n', processInput2);
    }

    function processInput2(input) {
        userID = input;

        var res = treeFuncs.removeUserFromGroup(groupID, userID);
        if (res){
            console.log('User was successfully removed from the group!');
        } else {
            console.log('Group/User name does not exist!');
        }
        menu.question('Press any key to continue...', processInput3);
    }

    function processInput3() {
        showChatMenu();
    }
}
//===========================================================================
// addGroupToGroupWithQuestion
//===========================================================================
function addGroupToGroupWithQuestion() {
    console.clear();
    var parentGroupID = null;
    var childGroupID = null;

    menu.question('Please enter parent group ID:\n', processInput1);

    function processInput1(input) {
        parentGroupID = input;
        menu.question('Please enter child group ID:\n', processInput2);
    }

    function processInput2(input) {
        childGroupID = input;

        var res = treeFuncs.addGroupToGroup(parentGroupID, childGroupID);
        if (res !== null){
            console.log('Child group was successfully added to the parent group!');
        } else {
            console.log('Failed!');
        }
        menu.question('Press any key to continue...', processInput3);
    }

    function processInput3() {
        showChatMenu();
    }
}
//===========================================================================
// removeGroupHierarchyWithQuestion
//===========================================================================
function removeGroupHierarchyWithQuestion() {
    console.clear();

    menu.question('Please enter ID of group to remove:\n', processInput1);

    function processInput1(groupToRemoveID) {

        var res = treeFuncs.removeGroupHierarchy(groupToRemoveID);
        if (!!res){
            console.log('Group was successfully removed!');
        } else {
            console.log('Failed!');
        }
        menu.question('Press any key to continue...', processInput3);
    }

    function processInput3() {
        showChatMenu();
    }
}
//===========================================================================
// printGroupsUsersDisplayTree
//===========================================================================
function printGroupsUsersDisplayTree() {
    console.clear();

    treeFuncs.printTree();

    menu.question('Press any key to continue...', processInput1);

    function processInput1() {
        showChatMenu();
    }
}




