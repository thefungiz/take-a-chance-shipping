var Migrations = artifacts.require("./Migrations.sol");
var ShippingFactory = artifacts.require("./ShippingFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ShippingFactory);
};
