const userFuncs = require('../Modules/users.js');
const groupFuncs = require('../Modules/groups.js');
const chatFuncs = require('../Modules/chat.js');

try {
    console.log("\n#======================================================");
    console.log("# After user objects were created:");
    console.log("#======================================================");
    userFuncs.createNewUser("user1", "", 34);
    userFuncs.createNewUser("user2", "", 34);
    userFuncs.createNewUser("user3", "", 34);
    userFuncs.createNewUser("user4", "", 34);
    userFuncs.createNewUser("user5", "", 34);

    console.log("\n#======================================================");
    console.log("# After username updates:");
    console.log("#======================================================");
    userFuncs.updateUsername("user5", "user6");
    userFuncs.updateUserAge("user6", 26);
    console.log("user1 exists= " + userFuncs.doesUserExist("user1"));

    console.log("\n#======================================================");
    console.log("# After deleting user:");
    console.log("#======================================================");
    userFuncs.removeUser("user1");
    console.log("user1 exists= " + userFuncs.doesUserExist("user1"));

    console.log("\n#======================================================");
    console.log("# List of usernames =");
    console.log("#======================================================");
    console.log(userFuncs.getListOfUserNames());

    console.log("\n#======================================================");
    console.log("# After creating new groups:");
    console.log("#======================================================");
    groupFuncs.createNewGroup("group1");
    groupFuncs.createNewGroup("group2");

    chatFuncs.addGroupToGroup("General", "group1");
    chatFuncs.addGroupToGroup("General", "group2");

    groupFuncs.createNewGroup("group3");
    groupFuncs.createNewGroup("group4");
    groupFuncs.createNewGroup("group5");
    groupFuncs.createNewGroup("group7");
    groupFuncs.createNewGroup("group8");
    groupFuncs.createNewGroup("group9");
    groupFuncs.createNewGroup("group10");

    console.log("group5 exists= " + groupFuncs.doesGroupExist("group5"));

    console.log("\n#======================================================");
    console.log("# PRINTING TREE:");
    console.log("#======================================================");
    chatFuncs.printTree();

    console.log("\n#======================================================");
    console.log("# After removing one group:");
    console.log("#======================================================");
    groupFuncs.removeGroup("group5");
    console.log("group5 exists= " + groupFuncs.doesGroupExist("group5"));

    console.log("\n#======================================================");
    console.log("# List of group names = ");
    console.log("#======================================================");
    console.log(groupFuncs.getListOfGroupNames());

    console.log("\n#======================================================");
    console.log("# After adding users to groups:");
    console.log("#======================================================");
    chatFuncs.addUserToGroup("group1", "user2");
    chatFuncs.addUserToGroup("group2", "user3");
    chatFuncs.addUserToGroup("group2", "user4");
    chatFuncs.addUserToGroup("group3", "user6");

    console.log("\n#======================================================");
    console.log("# After trying to remove user that does not exist from group:");
    console.log("#======================================================");
    chatFuncs.removeUserFromGroup("group2", "user4");

    console.log("\n#======================================================");
    console.log("# After adding groups to groups:");
    console.log("#======================================================");
    chatFuncs.addGroupToGroup("General", "group1");
    chatFuncs.addGroupToGroup("General", "group2");
    chatFuncs.addGroupToGroup("group7", "group3");
    chatFuncs.addGroupToGroup("group8", "group4");

    console.log("\n#======================================================");
    console.log("# PRINTING TREE:");
    console.log("#======================================================");
    chatFuncs.printTree();

    console.log("\n#======================================================");
    console.log("# After removing groups from groups:");
    console.log("#======================================================");
    chatFuncs.removeGroupFromGroup("General", "group1");
    chatFuncs.removeGroupFromGroup("General", "group2");
    chatFuncs.removeGroupFromGroup("group7", "group3");
    chatFuncs.removeGroupFromGroup("group8", "group4");

    console.log("\n#======================================================");
    console.log("# After adding again groups to groups:");
    console.log("#======================================================");
    chatFuncs.addGroupToGroup("General", "group1");
    chatFuncs.addGroupToGroup("General", "group2");
    chatFuncs.addGroupToGroup("group7", "group3");
    chatFuncs.addGroupToGroup("group8", "group4");
    chatFuncs.addGroupToGroup("General", "group7");
    chatFuncs.addGroupToGroup("group7", "group3");
    chatFuncs.addGroupToGroup("group7", "group9");
    chatFuncs.addGroupToGroup("group9", "group10");

    console.log("\n#======================================================");
    console.log("# PRINTING TREE:");
    console.log("#======================================================");
    chatFuncs.printTree();

    console.log("\n#======================================================");
    console.log("# After removing groups from groups:");
    console.log("#======================================================");
    chatFuncs.removeGroupFromGroup("General", "group2");

    console.log("\n#======================================================");
    console.log("# PRINTING TREE:");
    console.log("#======================================================");
    chatFuncs.printTree();

    console.log("\n#======================================================");
    console.log("# Search group in group results:");
    console.log("#======================================================");

    var arrayOfPath = chatFuncs.searchGroupInGroupHierarchy("group10");
    console.log("Path of 'group10'= " + arrayOfPath);

    var arrayOfPath = chatFuncs.searchGroupInGroupHierarchy("group3");
    console.log("Path of 'group3'= " + arrayOfPath);

    var arrayOfPath = chatFuncs.searchGroupInGroupHierarchy("group1");
    console.log("Path of 'group1'= " + arrayOfPath);

    console.log("\nEdge case! (if child group do not exist)");
    var arrayOfPath = chatFuncs.searchGroupInGroupHierarchy("General");
    console.log("Path of 'General'= " + arrayOfPath);

    console.log("\nEdge case! (if child group do not exist)");
    var arrayOfPath = chatFuncs.searchGroupInGroupHierarchy("blabla");
    console.log("Path of 'blabla'= " + arrayOfPath);

    console.log("\n#======================================================");
    console.log("# After adding group1 to group10:");
    console.log("#======================================================");

    chatFuncs.addGroupToGroup("group10", "group1");

    console.log("\n#======================================================");
    console.log("# PRINTING TREE:");
    console.log("#======================================================");
    chatFuncs.printTree();

    console.log("\n#======================================================");
    console.log("# Verifying that groups cannot point each other!" );
    console.log("# After adding group7 to group10:");
    console.log("#======================================================");

    chatFuncs.addGroupToGroup("group10", "group7");
    console.log("\n Please verify that group7 was not added to group10 !");

    console.log("\n#======================================================");
    console.log("# PRINTING TREE:");
    console.log("#======================================================");
    chatFuncs.printTree();

    console.log("\n#======================================================");
    console.log("# Search group1 in group results (it appears under two groups):");
    console.log("#======================================================");

    var arrayOfPath = chatFuncs.searchGroupInGroupHierarchy("group1");
    console.log("Path of 'group1'= " + arrayOfPath);

    console.log("\n======================================================");
    console.log('PASS!');
}
catch (err) {
    console.log("\n======================================================");
    console.log('FAIL!\n');
    console.log(err);
}







