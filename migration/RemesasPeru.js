const RemesasPeru = artifacts.require("RemesasPeru");

module.exports = function(deployer) {
    deployer.deploy(RemesasPeru);
};