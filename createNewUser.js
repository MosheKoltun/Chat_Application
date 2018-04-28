
function createNewUser(name, password, age) {
    User = require('./users.js');
    var newUser = new User(name, password, age);
/*
    newUser.setName(name);
    newUser.setPassword(password);
    newUser.setAge(age);
*/
    usersList.push(newUser);
}

//===========================================================================
module.exports =  createNewUser;


