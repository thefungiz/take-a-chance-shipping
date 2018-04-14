# take-a-chance-shipping

# truffle stuff
`truffle init`
`truffle migrate --reset`
`truffle console`


# Console Stuff
```
// create Shipping Factory
var sf;
ShippingFactory.deployed().then(function(d) { sf = d } );
```

```
// Initialize the buyer escrow
sf.buyerInitialize(web3.eth.accounts[1],90, {from:web3.eth.accounts[2], value:90});
```

```
// Initialize the shipper escrow and create the shipping contract
sf.shipperCreateContract(web3.eth.accounts[1],web3.eth.accounts[2],90, {from:web3.eth.accounts[3], value:90});
```

```
web3.eth.getTransaction("0x55a611e58f7e165c3b015d4f7bb822f9de2f126c")
web3.eth.getTransaction("0x34682bc2b36d0fd0c096a48a6ff34c575b17233f5f196b4cace1d266c3f29c95")
```

```
sf.allEvents()
sf.allEvents({},{fromBlock:0, toBlock:"latest"}, function(e,r) {console.log(r)})
```