import React, { Component } from 'react'
import ShippingFactory from '../build/contracts/ShippingFactory.json'
import getWeb3 from './utils/getWeb3'
import daccounts from '../public/accounts'

class Store extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null
    }
    this.buyerInitialize = this.buyerInitialize.bind(this)
    this.handleShipperChange = this.handleShipperChange.bind(this)
  }

  componentWillMount() {
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3,
          initialAmount: .015,
          shippingCost: 0.0,
          shipperSelected: false,
          totalAmount: "-"
        })
        // Instantiate contract once web3 provided.
        // this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }

  instantiateContract() {
    // move stuff here
  }

  buyerInitialize() {
    const contract = require('truffle-contract');
    const sf = contract(ShippingFactory)
    sf.setProvider(this.state.web3.currentProvider)
    var sfi;

    var amount = this.state.initialAmount * 1e18;

    this.state.web3.eth.getAccounts((error, caccounts) => {
      sf.deployed().then((instance) => {
        sfi = instance;

        console.log("buyer", caccounts[0])
        sfi.buyerInitialize(caccounts[0], amount, { from: this.state.web3.eth.coinbase, value: amount });
      });
    })
  }

  handleShipperChange(e) {
    if (e.target.value == 1) {
      this.state.shipperSelected = true;
      var sc = (.1 * this.state.initialAmount);
      this.setState({ shipperSelected: true, shippingCost: sc, totalAmount: (sc + this.state.initialAmount) });
    } else {
      this.setState({ shipperSelected: false, shippingCost: 0, totalAmount: '-' });
    }

  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Shop</h2>
              <div className="row item-border">
                <div className="six columns">
                  <div className="row">
                    <h1>Fried Chicken</h1>
                  </div>
                  <div className="row item-border">
                    <img className="item-height" alt="chicken" src="Fried-Chicken-Leg.jpg" />
                  </div>
                </div>
                <div className="six columns">
                  <div className="row">
                    <span className="item-border"><img className="ether-sign" alt="ether_logo" src="ether-logo.png" />{this.state.initialAmount}</span>
                  </div>
                  <div className="row">
                    <select id="shipper" onChange={e => this.handleShipperChange(e)}>
                      <option value="">Select a shipping option</option>
                      <option value="1">Shipper 1 - 10%</option>
                    </select>:
                    <img className="ether-sign" alt="ether_logo" src="ether-logo.png" />
                    {this.state.shippingCost}
                  </div>
                  <div className="row">
                    Total: <img className="ether-sign" alt="ether_logo" src="ether-logo.png" />{this.state.totalAmount}
                  </div>
                  <div className="row">
                    <input disabled={!this.state.shipperSelected} className="basic-margin" type="button" value="buy" onClick={this.buyerInitialize} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Store
