const Ship = artifacts.require("Ship.sol");


contract("ShippingFactory", function(accounts) {
  var ship;

  before(async() => {
    ship = await Ship.new(accounts[0], accounts[1], accounts[2], 1000);
  });

  it("should have a buyer", async() => {
    let buyer = await ship.buyer();
    assert.equal(buyer, accounts[2]);
  });

  it("should have a seller", async() => {
    let seller = await ship.seller();
    assert.equal(seller, accounts[0]);
  });

  it("should have a shipper", async() => {
    let shipper = await ship.shipper();
    assert.equal(shipper, accounts[1]);
  });

  it("should have a purchase amount", async() => {
    let purchaseAmount = await ship.purchaseAmount();
    assert.equal(purchaseAmount, 1000);
  });

});
