pragma solidity ^0.4.17;

contract Ship {
    enum DeliveryStage { Ordered, InTransit, Delivered, Validated }
    enum DeliveryState { Correct, Wrong }

    uint256 public purchaseAmount;
    address public seller;
    address public shipper;
    address public buyer;
    uint256 public sellerGeotag;
    uint256 public buyerGeotag;
    DeliveryStage public deliveryStage;
    DeliveryState public deliveryState;

    function Ship(address _seller, address _shipper, address _buyer, uint256 _purchaseAmount, uint256 _sellerGeotag, uint256 _buyerGeotag) payable public {
        seller = _seller;
        shipper = _shipper;
        buyer = _buyer;
        purchaseAmount = _purchaseAmount;
        deliveryStage = DeliveryStage.Ordered;
        sellerGeotag = _sellerGeotag;
        buyerGeotag = _buyerGeotag;
    }

    modifier isShipper {
        require(msg.sender == shipper);
        _;
    }

    modifier isBuyer {
        require(msg.sender == buyer);
        _;
    }

    // T3
    function pickupShipment(uint256 geotag) public isShipper {
        require(geotag == sellerGeotag);
        deliveryStage = DeliveryStage.InTransit;
    }

    // T4
    function shipmentRecieved(uint256 geotag) public isShipper {
        require(geotag == buyerGeotag);
        deliveryStage = DeliveryStage.Delivered;
    }

    // T5
    function buyerValidation(DeliveryState _deliveryState) public isBuyer {
        deliveryStage = DeliveryStage.Validated;
        deliveryState = _deliveryState;
        // based off of state, divy escrow
    }
}
