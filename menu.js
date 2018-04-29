
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
            case '2': removeUserWithQuestion(); break;
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
    var userInput = {};
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
        if (users.doesUserExist(input)) { // check if username is not unique
            console.clear();
            console.log('Error username already exists!');
            menu.question('Please Enter Username:\n', processInput1);
        } else {
            userInput.username=input;
            menu.question('Please Enter Password:\n', processInput2);
        }
    }

    function processInput2(input) {
        userInput.password=input;
        menu.question('Please Enter Age:\n', processInput3);
    }

    function processInput3(input) {
        userInput.age=input;
        newUser = users.createNewUser(userInput.username, userInput.password, userInput.age);
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
// printListOfUserNames
//===========================================================================
function removeUserWithQuestion() {
    console.clear();

    if(menu) menu.close();

    // Creates a readline Interface instance
    menu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    menu.question('Please enter username to be removed:\n', processInput1);

    function processInput1(input) {
        var res = users.removeUser(input);
        if (res){
            console.log('Username was successfully removed!');
        } else {
            console.log('Username does not exist!');
        }
        menu.question('Press any key to continue...', processInput2);
    }

    function processInput2(input) {
        showUserMenu();
    }
}

//===========================================================================
module.exports =  init;

