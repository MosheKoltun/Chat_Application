const userFuncs = require('../Modules/users.js');
const groupFuncs = require('../Modules/groups.js');
const chatFuncs = require('../Modules/chat.js');

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
            case '1': createNewUser(); break;
            case '2': removeUser(); break;
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
            case '1': updateUsername(); break;
            case '2': updateUserAge(); break;
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
            case '1' : createNewGroup(); break;
            case '2' : removeGroup(); break;
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
        '5 = Show List Of Group And Users\n' +
        '6 = Go back to main               '
    );
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': addUserToGroup(); break;
            case '2': removeUserFromGroup(); break;
            case '3': addGroupToGroup(); break;
            case '4': removeGroupFromGroup(); break;
            case '5': printGroupsUsersDisplayTree(); break;
            case '6': showMainMenu(); break;
            default: showChatMenu() /* show menu again if input does not match */;
        }
    });
}
//===========================================================================
// createNewUser
//===========================================================================
function createNewUser() {
    var userInput = {};
    console.clear();
    menu.question('Please Enter Username:\n', processInput1);
    function processInput1(input) {
        var userObject = userFuncs.doesUserExist(input);
        if (userObject!=null) {
            // check if username is not unique
            console.clear();
            console.log('Error username already exists!');
            menu.question('Please Enter Username:\n', processInput1);
        } else {
            if (input === "") {
                menu.question('Field is empty. Please enter username again:\n', processInput1);
            } else {
                userInput.username = input;
                menu.question('Please Enter Password:\n', processInput2);
            }
        }
    }
    function processInput2(input) {
        userInput.password=input;
        menu.question('Please Enter Age:\n', processInput3);
    }
    function processInput3(input) {
        userInput.age=input;
        userFuncs.createNewUser(userInput.username, userInput.password, userInput.age);
        showUserMenu();
    }
}
//===========================================================================
// printListOfUserNames
//===========================================================================
function printListOfUserNames() {
    console.clear();
    var listOfUsernames = userFuncs.getListOfUserNames();
    for(var i=0; i<listOfUsernames.length; i++) {
        console.log(listOfUsernames[i]);
    }
    menu.question('Press any key to continue...', processInput1);
    function processInput1() {
        showUserMenu();
    }
}
//===========================================================================
// removeUserWithQuestion
//===========================================================================
function removeUser() {
    console.clear();
    menu.question('Please enter username to be removed:\n', processInput1);
    function processInput1(input) {
        var res = userFuncs.removeUser(input);
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
// updateUsername
//===========================================================================
function updateUsername() {
    console.clear();
    menu.question('Please enter old username:\n', processInput1);
    var oldUsername = null;

    function processInput1(input) {
        oldUsername = input;
        var userObject = userFuncs.doesUserExist(input);
        if (userObject!=null) {
            menu.question('Please enter new username:\n', processInput2);
        } else {
            console.log('Username does not exist!');
            menu.question('Press any key to continue...', processInput3);
        }
    }
    function processInput2(input) {
        var newUsername = input;
        userFuncs.updateUsername(oldUsername, newUsername);
        console.log('Username was successfully changed!');
        menu.question('Press any key to continue...', processInput3);
    }
    function processInput3() {
        showUpdateUserProfileMenu();
    }
}
//===========================================================================
// updateUserAge
//===========================================================================
function updateUserAge(){
    console.clear();
    menu.question('Please enter username:\n', processInput1);
    var username = null;
    function processInput1(input) {
        username = input;
        var userObject = userFuncs.doesUserExist(input);
        if (userObject!=null) {
            menu.question('Please enter new age:\n', processInput2);
        } else {
            console.log('Username does not exist!');
            menu.question('Press any key to continue...', processInput3);
        }
    }
    function processInput2(input) {
        var newUserAge = input;
        userFuncs.updateUserAge(username, newUserAge);
        console.log('User age was successfully changed!');
        menu.question('Press any key to continue...', processInput3);
    }
    function processInput3() {
        showUpdateUserProfileMenu();
    }
}
//===========================================================================
// createNewGroup
//===========================================================================
function createNewGroup() {
    console.clear();
    menu.question('Please Enter Group Name:\n', processInput1);

    function processInput1(input) {
        if (input === "") {
            menu.question('Field is empty. Please enter group name again:\n', processInput1);
        } else {
            console.clear();
            var res = groupFuncs.createNewGroup(input);
            if (res===null) {
                console.log('Error Group name already exists!');
                menu.question('Please Enter Group Name:\n', processInput1);
            }
            showGroupsMenu();
        }
    }
}
//===========================================================================
// printListOfGroupNames
//===========================================================================
function printListOfGroupNames() {
    console.clear();
    var listOfGroupNames = groupFuncs.getListOfGroupNames();
    for(var i=0; i<listOfGroupNames.length; i++) {
        console.log(listOfGroupNames[i]);
    }
    menu.question('Press any key to continue...', processInput1);

    function processInput1() {
        showGroupsMenu();
    }
}
//===========================================================================
// removeGroup
//===========================================================================
function removeGroup() {
    console.clear();
    menu.question('Please enter group name to be removed:\n', processInput1);
    function processInput1(input) {
        var res = groupFuncs.removeGroup(input);
        if (res){
            console.log('Group name was successfully removed!');
        } else {
            console.log('Group name does not exist!');
        }
        menu.question('Press any key to continue...', processInput2);
    }
    function processInput2() {
        showGroupsMenu();
    }
}
//===========================================================================
// addUserToGroup
//===========================================================================
function addUserToGroup() {
    console.clear();
    var groupName = null;
    var username = null;

    menu.question('Please enter group name:\n', processInput1);

    function processInput1(input) {
        groupName = input;
        menu.question('Please enter username:\n', processInput2);
    }

    function processInput2(input) {
        username = input;

        var res = chatFuncs.addUserToGroup(groupName, username);
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
// removeUserFromGroup
//===========================================================================
function removeUserFromGroup() {
    console.clear();
    var groupName = null;
    var username = null;

    menu.question('Please enter group name:\n', processInput1);

    function processInput1(input) {
        groupName = input;
        menu.question('Please enter username:\n', processInput2);
    }

    function processInput2(input) {
        username = input;

        var res = chatFuncs.removeUserFromGroup(groupName, username);
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
// addGroupToGroup
//===========================================================================
function addGroupToGroup() {
    console.clear();
    var parentGroupName = null;
    var childGroupName = null;

    menu.question('Please enter parent group name:\n', processInput1);

    function processInput1(input) {
        parentGroupName = input;
        menu.question('Please enter child group name:\n', processInput2);
    }

    function processInput2(input) {
        childGroupName = input;

        var res = chatFuncs.addGroupToGroup(parentGroupName, childGroupName);
        if (res){
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
// removeUserFromGroup
//===========================================================================
function removeGroupFromGroup() {
    console.clear();
    var parentGroupName = null;
    var childGroupName = null;

    menu.question('Please enter parent group name:\n', processInput1);

    function processInput1(input) {
        parentGroupName = input;
        menu.question('Please enter child group name:\n', processInput2);
    }

    function processInput2(input) {
        childGroupName = input;

        var res = chatFuncs.removeGroupFromGroup(parentGroupName, childGroupName);
        if (res){
            console.log('Child group was successfully removed from the parent group!');
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
// getListOfGroupAndUsers
//===========================================================================
function printGroupsUsersDisplayTree() {
    console.clear();

    chatFuncs.printTree();

    menu.question('Press any key to continue...', processInput1);

    function processInput1() {
        showChatMenu();
    }
}




