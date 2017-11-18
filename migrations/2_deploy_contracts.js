var Splitter = artifacts.require("./Splitter.sol");

var acc1 = 0xc2076c95661e65c4a00c12409f597484a5dcca6e;

var acc2 = 0x14b9e0c0fb1b407ef2b26c2b60004b9f7cf5effe;

var acc3 = 0x73f5f69f55ab78dbee774c3da5c981a54f70714c;

module.exports = function(deployer,network,accounts) {

    deployer.deploy(Splitter,accounts[0],accounts[1],accounts[2]);


};
