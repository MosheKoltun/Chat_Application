
function askUserForData() {
    const menuInit = require('./menu.js');
    const createNewUser = require('./createNewUser.js');
    const User = require('./users.js');

    var newUserData = {
        name: "",
        password: "",
        age: 0
    };

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
        createNewUser(newUserData['name'], newUserData['password'], newUserData['age']);
        menu.close();
        menuInit();
    }
}

//===========================================================================
module.exports =  askUserForData;


