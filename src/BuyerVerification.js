import React, { Component } from "react";
import daccounts from '../public/accounts'

import ShippingFactory from '../build/contracts/ShippingFactory.json'
import Ship from '../build/contracts/Ship.json'

class BuyerVerification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            web3: window.web3,
            message: 'no action has been taken'

        };
        if (props.match.params["hash"]) {
            this.state.hash = props.match.params["hash"];
        }
        this.send = this.send.bind(this)
        this.correct = this.correct.bind(this)
        this.wrong = this.wrong.bind(this)
    }

    send(value) {
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
                    shipConbtract.buyerValidation(value, { from: self.state.web3.eth.coinbase },
                        (err, res) => {
                            console.log('err', err)
                            console.log('res', res)
                        });

                } else {
                    console.log("res not received")
                }
            });
        });
    }

    correct() {
        this.send(0)
    }

    wrong() {
        this.send(1)
    }

    render() {
        return (
            <div>
                <h1> Buyer Validation </h1>
                <p>
                    Was the item delivery correct?
                <button onClick={this.correct}>Correct</button>
                    <button onClick={this.wrong}>Wrong</button>

                </p>
            </div>
        );
    }
}

export default BuyerVerification;