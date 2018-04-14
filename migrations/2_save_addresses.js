var ShippingFactory = artifacts.require("./ShippingFactory.sol");
var fs = require('fs');
var path = require('path')

module.exports = function(deployer) {
    var json = JSON.stringify(web3.eth.accounts);
    
    fs.writeFile(path.resolve(__dirname,'../public/accounts.json'), json, 'utf8', function(err, data) {console.log(err)});

  };