pragma solidity ^0.4.17;
import "./Ship.sol";

contract ShippingFactory {
    enum DeliveryState { Pending, InTransit, Complete, Damage, WrongItem }
    
    event ShippingEvent(
        address indexed _seller,
        address indexed _shipper,
        address indexed _buyer,
        address _newShippingContract,
        uint256 _purchaseAmount
    );

    // Key is hash for escrow ID
    mapping(bytes32 => mapping(address => bool)) public escrow;

    // Buyer is going to initialize
    function buyerInitialize(address _seller, uint256 _purchaseAmount) public payable {
        address buyer = msg.sender;
        require(msg.value == _purchaseAmount);
        bytes32 escrowHash = keccak256(_seller, buyer, _purchaseAmount);
        escrow[escrowHash][msg.sender] = true;
    }

    // Called by shipper
    function shipperCreateContract(address _seller, address _buyer, uint256 _purchaseAmount) internal returns(address) {
        address shipper = msg.sender;
        bytes32 escrowHash = keccak256(_seller, _buyer, _purchaseAmount);
        require(msg.value == _purchaseAmount);
        require(escrow[escrowHash][_buyer]);
        address newShippingContract = new Ship(_seller, shipper, _buyer, _purchaseAmount);
        emit ShippingEvent(_seller, shipper, _buyer, newShippingContract, _purchaseAmount);
        return newShippingContract; // hack
    }

    // pickup function

    // dropoff function

    // buyer condition function

    // divy escrow
}