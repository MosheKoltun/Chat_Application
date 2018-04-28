
//===========================================================================
// init
//===========================================================================
function init() {
    //Group = require('./groups.js');
    main();
}

//===========================================================================
// main
//===========================================================================
function main() {
    CreateNewGroupForm();
}

//===========================================================================
// CreateNewGroupForm
//===========================================================================

function CreateNewGroupForm() {
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
    menu.question('Please Enter Group Name:\n', processInput1);

    function processInput1(input) {
        showGroupsMenu();
    }
}

//===========================================================================
module.exports =  init;