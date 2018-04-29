init(); // not using self invoking function because exports cannot work with it

//===========================================================================
// init
//===========================================================================
function init(){
    menuInit = require('./menu.js');
    main();
};

//===========================================================================
// main
//===========================================================================
function main(){
    //var users = [];
    //var users = [new User('Itay'), new User('Yuval')];
    menuInit();
}
