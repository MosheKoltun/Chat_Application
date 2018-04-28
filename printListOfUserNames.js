
function printListOfUserNames()
{
    const getListOfUserNames = require('./getListOfUserNames.js');

    console.clear();
    menu.close();
    var listOfUsernames = getListOfUserNames();
    for (var i = 0; i < listOfUsernames.length; i++) {
        console.log(listOfUsernames[i]);
    }
    console.log('Press any key to continue...');

    process.stdin.resume();
    process.stdin.on('data', function () {
        menuInit();
    });
}
//===========================================================================
module.exports = printListOfUserNames;