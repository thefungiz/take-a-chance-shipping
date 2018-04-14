pragma solidity ^0.4.17;

contract Ship {
    enum DeliveryState { Ordered, InTransit, Complete, Damage, WrongItem }

    uint256 public purchaseAmount;
    address public seller;
    address public shipper;
    address public buyer;
    uint public contractTime;
    uint public pickupTime;
    uint public dropoffTime;
    DeliveryState public deliveryState;

    function Ship(address _seller, address _shipper, address _buyer, uint256 _purchaseAmount) payable public {
        seller = _seller;
        shipper = _shipper;
        buyer = _buyer;
        purchaseAmount = _purchaseAmount;
        deliveryState = DeliveryState.Ordered;
        contractTime = now;
    }

    function pickupShipment() public {
        require(msg.sender == shipper);
        deliveryState = DeliveryState.InTransit;
        pickupTime = now;
    }

    function shipmentRecieved(DeliveryState _deliveryState) public {
        require(msg.sender == buyer);
        deliveryState = _deliveryState;
        dropoffTime = now;
    }
}
