import React, { Component } from "react";
import ShippingFactory from '../build/contracts/ShippingFactory.json'
import Ship from '../build/contracts/Ship.json'

class Home extends Component {

    constructor(props) {
        super(props)
        let shippingId = props.match.params["sid"]
        this.state = {
            web3: window.web3,
            shipStep: 1
        }
        if (shippingId) {
            this.state.sid = shippingId;
        }
    }

    componentWillMount() {


        var self = this;
        const contract = require('truffle-contract');
        const sf = contract(ShippingFactory)

        sf.setProvider(this.state.web3.currentProvider)
        var sfi;
        var self = this;

        sf.deployed().then(function (res) {
            sfi = res;
            sfi.ShippingEvent({}, { fromBlock: 0, toBlock: "latest" }).get((err, res) => {
                // todo, find the one we need
                console.log(res)

                if (res.length > 0) {
                    let mostRecent = res.reverse()[0].args;
                    console.log(mostRecent); // ALL ARGS EMITTED

                    let contract = mostRecent._newShippingContract;
                    console.log(contract); // contract address
                    let shipConbtract = self.state.web3.eth.contract(Ship.abi).at(contract);
                    console.log(shipConbtract);
                    shipConbtract.deliveryStage(function (err, res) {
                        var step = +res + 1;
                        step = step > 1 ? step + 1 : step;
                        self.setState({ shipStep: step });
                    });
                } else {
                    console.log('not found');
                }
            });
        });
    }

    render() {
        return (
            <div>
                <div className="content-margin-top">
                    <h2 className="content-margin-top">Shipping</h2>
                    <div className="item-border">
                        <h4>Order ID: {this.state.sid}</h4>
                        <div className="row">
                            <div className="one column"></div>
                            <div className="two columns">Buyer Initialization</div>
                            <div className="two columns">Pickup</div>
                            <div className="two columns">In-Transit</div>
                            <div className="two columns">Delivery</div>
                            <div className="two columns">Buyer Verification</div>
                            <div className="one column"></div>
                        </div>
                        <div className="row margin-top">
                            <div className="one column"></div>
                            <div className="two columns"><div className={(this.state.shipStep > 0 ? 'green-dot' : 'gray-dot')}></div></div>
                            <div className="two columns"><div className={this.state.shipStep > 1 ? "green-dot" : "gray-dot"}></div></div>
                            <div className="two columns"><div className={this.state.shipStep > 2 ? "green-dot" : "gray-dot"}></div></div>
                            <div className="two columns"><div className={this.state.shipStep > 3 ? "green-dot" : "gray-dot"}></div></div>
                            <div className="two columns"><div className={this.state.shipStep > 4 ? "green-dot" : "gray-dot"}></div></div>
                            <div className="one column"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;