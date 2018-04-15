pragma solidity ^0.4.17;

import "./Ship.sol";

contract ShippingFactory {

    event ShippingEvent(
        address indexed _seller,
        address indexed _shipper,
        address indexed _buyer,
        address _newShippingContract,
        uint256 _purchaseAmount
    );

    event BuyerInitialize (
        address indexed _seller,
        address indexed _buyer,
        uint256 _purchaseAmount  
    );

    // Key is hash for escrow ID
    mapping(bytes32 => mapping(address => bool)) public escrow;

    // Buyer is going to initialize
    // T1
    function buyerInitialize(address _seller, uint256 _purchaseAmount, address _shipper) public payable {
        address buyer = msg.sender;
        require(msg.value == _purchaseAmount);
        bytes32 escrowHash = keccak256(_seller, buyer, _purchaseAmount);
        escrow[escrowHash][msg.sender] = true;
        emit BuyerInitialize(buyer, _seller, _purchaseAmount);
        shipperCreateContract(_seller, buyer, _purchaseAmount, 90, 90, _shipper);
    }

    // Called by shipper
    // T2
    function shipperCreateContract(address _seller, address _buyer, uint256 _purchaseAmount, uint256 _sellerGeotag, uint256 _buyerGeotag, address _shipper) payable public {
        bytes32 escrowHash = keccak256(_seller, _buyer, _purchaseAmount);
        require(msg.value == _purchaseAmount);
        require(escrow[escrowHash][_buyer]);
        address newShippingContract = new Ship(_seller, _shipper, _buyer, _purchaseAmount, _sellerGeotag, _buyerGeotag);
        emit ShippingEvent(_seller, _shipper, _buyer, newShippingContract, _purchaseAmount);
    }



    // dropoff function

    // buyer condition function

    // divy escrow
}
