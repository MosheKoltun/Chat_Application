const userFuncs = require('../Modules/users.js');
const groupFuncs = require('../Modules/groups.js');
const treeFuncs = require('../Modules/tree.js');

const redColor = "\x1b[31m%s\x1b[0m";
const greenColor = "\x1b[32m%s\x1b[0m";
const blueColor = "\x1b[34m%s\x1b[0m";
const magentaColor = "\x1b[35m%s\x1b[0m";
const cyanColor= "\x1b[36m%s\x1b[0m";

try {
    console.log(cyanColor,"\n#======================================================");
    console.log(cyanColor,"# After user objects were created:");
    console.log(cyanColor,"#======================================================");

    console.log(JSON.stringify(userFuncs.createNewUser("user0", "", 34)));
    console.log(JSON.stringify(userFuncs.createNewUser("user1", "", 34)));
    var user2Object = userFuncs.createNewUser("user2", "", 34)
    console.log(JSON.stringify(user2Object));
    console.log(JSON.stringify(userFuncs.createNewUser("user3", "", 34)));
    console.log(JSON.stringify(userFuncs.createNewUser("user4", "", 34)));
    console.log(JSON.stringify(userFuncs.createNewUser("user5", "", 34)));

    console.log("\n#======================================================");
    console.log("# After username updates:");
    console.log("# user5 changed to user6");
    console.log("#======================================================");
    console.log(userFuncs.updateUsername("user5", "user6"));
    console.log(userFuncs.updateUserAge("user6", 26));

    console.log("\n#======================================================");
    console.log("> Does user1 exist?")
    console.log("#======================================================");
    console.log(JSON.stringify(userFuncs.doesUserExist("user1")));

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# After deleting user1:");
    console.log(redColor,"#======================================================");
    console.log(userFuncs.removeUser("user1"));

    console.log("\n#======================================================");
    console.log("> Does user1 exist?")
    console.log("#======================================================");
    console.log(userFuncs.doesUserExist("user1"));

    console.log("\n#======================================================");
    console.log("# List of usernames =");
    console.log("#======================================================");
    console.log(userFuncs.getListOfAllUserObjects());

    console.log(cyanColor,"\n#======================================================");
    console.log(cyanColor,"# After creating new groups (group1 till group10):");
    console.log(cyanColor,"#======================================================");
    console.log(JSON.stringify(groupFuncs.createNewGroup("group1")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group2")));
    var group3Object = groupFuncs.createNewGroup("group3");
    console.log(JSON.stringify(group3Object));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group4")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group5")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group6")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group7")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group8")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group9")));
    var group10Object = groupFuncs.createNewGroup("group10");
    console.log(JSON.stringify(group10Object));

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After Adding group1 and group2 to General:");
    console.log(greenColor,"#======================================================");

    var group1Object = treeFuncs.addGroupToGroup(0, 1);
    console.log(JSON.stringify(group1Object));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 2)));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(magentaColor,"\n#======================================================");
    console.log(magentaColor,"# Search group1 in group results:");
    console.log(magentaColor,"#======================================================");

    console.log("1st Path of 'group1'= ");
    console.log(JSON.stringify(treeFuncs.searchGroupInGroupHierarchy(group1Object)));

    console.log("\n#======================================================");
    console.log("# List of group names = ");
    console.log("#======================================================");
    console.log(groupFuncs.getListOfAllGroupObjects());

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding users to groups:");
    console.log(greenColor,"# user2 and user3 to group 1");
    console.log(greenColor,"# user4 and user2 to group 2");
    console.log(greenColor,"#======================================================");
    console.log(treeFuncs.addUserToGroup(1, 2));
    console.log(treeFuncs.addUserToGroup(1, 3));
    console.log(treeFuncs.addUserToGroup(2, 4));
    console.log(treeFuncs.addUserToGroup(2, 2));

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# After trying to remove user that does not exist from group:");
    console.log(redColor,"# user4 to group2:");
    console.log(redColor,"#======================================================");
    console.log(treeFuncs.removeUserFromGroup(2, 4));

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding groups to groups:");
    console.log(greenColor,"# group3 to group7");
    console.log(greenColor,"# group8 to group4");
    console.log(greenColor,"#======================================================");
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(7, 3)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(8, 4)));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# After removing groups from groups:\n" +
                        "# group1 from General\n" +
                        "# group2 from General\n" +
                        "# group3 from group7\n" +
                        "# group4 from group8");
    console.log(redColor,"#======================================================");

    console.log(redColor,"\nTESTING...");

    console.log(treeFuncs.removeGroupFromGroup(0, 1));
    console.log(treeFuncs.removeGroupFromGroup(0, 2));
    console.log(treeFuncs.removeGroupFromGroup(7, 3));
    console.log(treeFuncs.removeGroupFromGroup(8, 4));

    console.log("\n#======================================================");
    console.log("# List of group names = ");
    console.log("#======================================================");

    console.log(groupFuncs.getListOfAllGroupObjects());

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding again groups to groups:\n" +
                "# \"General\", \"group1\"\n" +
                "# \"General\", \"group2\"\n" +
                "# \"group7\", \"group3\"\n" +
                "# \"group8\", \"group4\"\n" +
                "# \"General\", \"group7\"\n" +
                "# \"group7\", \"group9\"\n" +
                "# \"group9\", \"group10\"\n" +
                "# \n" +
                "# \"group7\", \"group3\"");
    console.log(greenColor,"#======================================================");

    var group1Object = treeFuncs.addGroupToGroup(0, 1);
    console.log(JSON.stringify(group1Object));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 2)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(7, 3)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(8, 4)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 7)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(7, 9)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(9, 10)));
    console.log("\n" + JSON.stringify(treeFuncs.addGroupToGroup(7, 3)));


    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();


    console.log(cyanColor,"\n#======================================================");
    console.log(cyanColor,"# After creating new groups (group1 till group10):");
    console.log(cyanColor,"#======================================================");

    var group1Object_2nd = console.log(JSON.stringify(groupFuncs.createNewGroup("group1")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group2")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group3")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group4")));

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding again groups to groups:\n" +
        "# \"General\", \"group1\"\n" +
        "# \"General\", \"group2\"\n" +
        "# \"group7\", \"group3\"\n" +
        "# \"group8\", \"group4\"\n" +
        "# \n" +
        "# \"group7\", \"group3\"");
    console.log(greenColor,"#======================================================");

    group1Object = treeFuncs.addGroupToGroup(0, 1);
    console.log(JSON.stringify(group1Object));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 2)));
    group3Object = treeFuncs.addGroupToGroup(7, 3)
    console.log(JSON.stringify(group3Object));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(8, 4)));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(redColor,"UNTIL HERE!");

    console.log(magentaColor,"\n#======================================================");
    console.log(magentaColor,"# Search group in group results:");
    console.log(magentaColor,"#======================================================");

    console.log("Path of 'group10'= ");
    console.log(treeFuncs.searchGroupInGroupHierarchy(group10Object));
    console.log("\nPath of 'group3'= " );
    console.log(treeFuncs.searchGroupInGroupHierarchy(group3Object));



    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After adding group1 to group10:");
    console.log(greenColor,"#======================================================");

    console.log(JSON.stringify(treeFuncs.addGroupToGroup(10, 1)));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    // After recursive clone this will be solved:

    // console.log(greenColor,"\n#======================================================");
    // console.log(greenColor,"# Verifying that groups cannot point each other!" );
    // console.log(greenColor,"# After adding group7 to group10:");
    // console.log(greenColor,"#======================================================");
    //
    // console.log(JSON.stringify(treeFuncs.addGroupToGroup(10, 7)));
    // console.log("\n Please verify that group7 was not added to group10 !");

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(magentaColor,"\n#======================================================");
    console.log(magentaColor,"# Search group1 in group results (it appears under two groups):");
    console.log(magentaColor,"#======================================================");

    console.log("1st Path of 'group1'= ");
    console.log(JSON.stringify(treeFuncs.searchGroupInGroupHierarchy(group1Object)));
    console.log("\n2nd Path of 'group1'= ");
    console.log(JSON.stringify(treeFuncs.searchGroupInGroupHierarchy(group1Object_2nd)));


    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# Removing group1");
    console.log(redColor,"#======================================================");
    console.log(treeFuncs.removeGroupFromGroup(0, 1));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(cyanColor,"\n#======================================================");
    console.log(cyanColor,"# After creating new groups (group11 and group12):");
    console.log(cyanColor,"#======================================================");

    console.log(JSON.stringify(groupFuncs.createNewGroup("group11")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group12")));

    console.log(magentaColor,"\n#======================================================");
    console.log(magentaColor,"# get USER2 parent groups:");
    console.log(magentaColor,"#======================================================");

    var res = groupFuncs.getUserGroupParents(user2Object);
    console.log("Object:");
    console.log(res);
    console.log("\nPrint all keys of object:");
    for(var groupObject in res) {
        console.log(groupObject);
    }

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# After removing group2 from groups:");
    console.log(redColor,"#======================================================");
    console.log(treeFuncs.removeGroupFromGroup(0, 2));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(magentaColor,"\n#======================================================");
    console.log(magentaColor,"# get USER2 parent groups:");
    console.log(magentaColor,"#======================================================");

    var res = groupFuncs.getUserGroupParents(user2Object);
    console.log("Object:");
    console.log(res);
    console.log("\nPrint all keys of object:");
    for(var groupObject in res) {
        console.log(groupObject);
    }

    console.log("\n======================================================");
    console.log(greenColor,'PASS!');
}
catch (err) {
    console.log("\n======================================================");
    console.log(redColor,'FAIL!\n');
    console.log(err);
}







