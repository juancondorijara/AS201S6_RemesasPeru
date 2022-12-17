const Remittances = artifacts.require("Remittances");

module.exports = function(deployer) {
    deployer.deploy(Remittances);
};