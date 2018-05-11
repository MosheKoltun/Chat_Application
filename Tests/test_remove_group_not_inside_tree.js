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
    console.log(cyanColor,"# After creating new groups (group1 till group3):");
    console.log(cyanColor,"#======================================================");

    console.log(JSON.stringify(groupFuncs.createNewGroup("group1")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group2")));
    var group3_Object = groupFuncs.createNewGroup("group3");
    console.log(JSON.stringify(group3_Object));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(redColor,"\n#======================================================");
    console.log(redColor,"# After removing group1 group2 and group3 from groups:");
    console.log(redColor,"#======================================================");

    console.log(groupFuncs.removeGroupNotInTree(1));
    console.log(groupFuncs.removeGroupNotInTree(2));
    console.log(groupFuncs.removeGroupNotInTree(3));

    console.log("\nHere you should expect to get 'false':");
    console.log(groupFuncs.removeGroupNotInTree(1));

    console.log(magentaColor,"\n#======================================================");
    console.log(magentaColor,"# Get list of groups");
    console.log(magentaColor,"#======================================================");
    var listOfGroups = (groupFuncs.getListOfAllGroupObjects());
    for (var group of listOfGroups) {
        console.log(JSON.stringify(group));
    }

    console.log("\n======================================================");
    console.log(greenColor,'PASS!');
}
catch (err) {
    console.log("\n======================================================");
    console.log(redColor,'FAIL!\n');
    console.log(err);
}







