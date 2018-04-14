pragma solidity ^0.4.17;

contract Ship {

    uint256 purchaseAmount;
    uint256 droneFee;
    address seller;
    address shipper;
    address buyer;

    function Ship(address _seller, address _shipper, address _buyer, uint256 _purchaseAmount) public {
        seller = _seller;
        shipper = _shipper;
        buyer = _buyer;
        purchaseAmount = _purchaseAmount;
    }



}