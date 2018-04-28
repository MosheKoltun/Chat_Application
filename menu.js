
//===========================================================================
// init
//===========================================================================
function init() {
    readline = require('readline');
    users = require('./users.js');
    menu = null;
    main();
}

//===========================================================================
// main
//===========================================================================
function main() {
    showMainMenu();
}

//===========================================================================
// showMainMenu
//===========================================================================

function showMainMenu() {
    // Clear screen
    console.clear();

    // Log the menu
    console.log(
        'Main menu      \n' +
        '===============\n' +
        '1 = Users Menu \n' +
        '2 = Groups Menu\n' +
        '3 = Exit'
    );

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    //Creates a readline Interface instance
        menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask question
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': showUserMenu(); break;
            case '2': showGroupsMenu(); break;
            case '3': process.exit(); break;
            default: showMainMenu() /* show menu again if input does not match */;
        }
    });
}

//===========================================================================
// showUserMenu
//===========================================================================

function showUserMenu() {
    // Clear screen
    console.clear();

    // Log the menu
    console.log(
        'User Menu              \n' +
        '=======================\n' +
        '1 = Create New User    \n' +
        '2 = Remove User        \n' +
        '3 = Update User Profile\n' +
        '4 = Get List of Users  \n' +
        '5 = Go back to main'
    );

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask question
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '1': askUserForData(); break;
            case '4': printListOfUserNames(); break;
            case '5': showMainMenu(); break;
            default: showUserMenu() /* show menu again if input does not match */;
        }
    });
}

//===========================================================================
// showGroupsMenu
//===========================================================================

function showGroupsMenu() {
    // Clear screen
    console.clear();

    // Log the menu
    console.log(
        'Groups Menu                     \n' +
        '================================\n' +
        '1 = Create New Group            \n' +
        '2 = Remove Group                \n' +
        '3 = Get List of Groups          \n' +
        '--------------------------------\n' +
        '4 = Add User To Group           \n' +
        '5 = Remove User From Group      \n' +
        '6 = Show List Of Group And Users\n' +
        '7 = Go back to main'
    );

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask question
    menu.question('Where to go? ', function(input) {
        switch(input) {
            case '7': showMainMenu(); break;
            default: showGroupsMenu() /* show menu again if input does not match */;
        }
    });
}
//===========================================================================
// askUserForData
//===========================================================================
function askUserForData() {

    var newUserData = {};

    // Clear screen
    console.clear();

    // Check if there is already a menu active. If true, close it.
    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask question
    menu.question('Please Enter Username:\n', processInput1);

    function processInput1(input) {
        //if (isUsernameUnique()) {
        if (true) {
            newUserData['name'] = input;
            menu.question('Please Enter Password:\n', processInput2);
        } else {
            menu.question('Please Enter Username:\n', processInput1);
        }
    }

    function processInput2(input) {
        newUserData['password'] = input;
        menu.question('Please Enter Age:\n', processInput3);
    }

    function processInput3(input) {
        newUserData['age'] = input;
        users.createNewUser(newUserData['name'], newUserData['password'], newUserData['age']);
        showUserMenu();
    }
}
//===========================================================================
// printListOfUserNames
//===========================================================================
function printListOfUserNames() {
    console.clear();

    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var listOfUsernames = users.getListOfUserNames();
    for (var i = 0; i < listOfUsernames.length; i++) {
        console.log(listOfUsernames[i]);
    }

    menu.question('Press any key to continue...', processInput1);

    function processInput1(input) {
        showUserMenu();
    }
}

//===========================================================================
module.exports =  init;

