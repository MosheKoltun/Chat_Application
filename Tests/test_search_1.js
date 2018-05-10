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
    console.log(cyanColor,"# After creating new groups (group1 till group10):");
    console.log(cyanColor,"#======================================================");

    console.log(JSON.stringify(groupFuncs.createNewGroup("group1")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group2")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group3")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group4")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group5")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group6")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group7")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group8")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group9")));
    console.log(JSON.stringify(groupFuncs.createNewGroup("group10")));

    console.log(greenColor,"\n#======================================================");
    console.log(greenColor,"# After building a tree:");
    console.log(greenColor,"#======================================================");

    //console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 1)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 1)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 2)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(1, 4)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(1, 5)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(4, 6)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(3, 7)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 8)));
    console.log(JSON.stringify(treeFuncs.addGroupToGroup(0, 9)));


    console.log(">>>>>>>>>>>>>>>>>>>>>");

    var group3_Object = treeFuncs.addGroupToGroup(4, 3);
    console.log(JSON.stringify(group3_Object));

    var group10_Object = treeFuncs.addGroupToGroup(4, 10);
    console.log(JSON.stringify(group10_Object));

    console.log(blueColor,"\n#======================================================");
    console.log(blueColor,"# PRINTING TREE:");
    console.log(blueColor,"#======================================================");
    treeFuncs.printTree();

    console.log(magentaColor,"\n#======================================================");
    console.log(magentaColor,"# Search group10 in group results:");
    console.log(magentaColor,"#======================================================");

    console.log("1st Path of 'group3'= ");
    console.log(JSON.stringify(treeFuncs.searchGroupInGroupHierarchy(group3_Object)));

    console.log("1st Path of 'group10'= ");
    console.log(JSON.stringify(treeFuncs.searchGroupInGroupHierarchy(group10_Object)));

    console.log("\n======================================================");
    console.log(greenColor,'PASS!');
}
catch (err) {
    console.log("\n======================================================");
    console.log(redColor,'FAIL!\n');
    console.log(err);
}







