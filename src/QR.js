import React, { Component } from "react";
import daccounts from '../public/accounts'

import ShippingFactory from '../build/contracts/ShippingFactory.json'
import Ship from '../build/contracts/Ship.json'

class QR extends Component {

    constructor(props) {
        super(props)
        this.state = {
            web3: window.web3,
            message: 'no action has been taken'
            
        };
        if (props.match.params["hash"]) {
            this.state.hash = props.match.params["hash"];
        }
        if (props.match.params["code"]) {
            this.state.code = props.match.params["code"];
        }
    }

    componentWillMount() {
        // this.state.web3.eth.getTransaction(this.state.hash, (err, res) => {
        //     console.log("error", err);
        //     console.log("resp", res);
        //     window.res = res;

        // });

        // const contract = require('truffle-contract');
        // const ship = contract(Ship)
        // var instance = ship.at(this.state.hash);
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
                    if (self.state.code == 'shipperp') {
                        shipConbtract.pickupShipment(90, { from: self.state.web3.eth.coinbase },
                            (err, res) => {
                                console.log('err', err)
                                console.log('res', res)
                                self.setState({message: 'You have dropped off the item!'})
                            });
                    } else
                        if (self.state.code == 'shipperd') {
                            shipConbtract.shipmentRecieved(90, { from: self.state.web3.eth.coinbase },
                                (err, res) => {
                                    console.log('err', err)
                                    console.log('res', res)
                                    self.setState({message: 'You have delivered the item!'})
                                });
                        }
                } else {
                    console.log("res not received")
                }
            });
        });
    }










    render() {
        return (
            <h1> {this.state.message} </h1>
        );
    }
}

export default QR;