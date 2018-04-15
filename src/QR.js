import React, { Component } from "react";
import daccounts from '../public/accounts'

import ShippingFactory from '../build/contracts/ShippingFactory.json'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            web3: window.web3,
            scon: null
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

        sf.deployed().then(function(res) {
            sfi = res;
            sfi.ShippingEvent({}, {fromBlock: 0, toBlock:"latest"}).get((err, res) => {
                // todo, find the one we need
                console.log(res)

                let mostRecent = res.reverse()[0].args;
                console.log(mostRecent); // ALL ARGS EMITTED

                let contract = mostRecent._newShippingContract;
                console.log(contract); // contract address
            });
        });


       
          if (this.state.code == 'shipperp') {
            
        }


      }
    









    render() {
        return (
            <p>qr {this.state.hash} {this.state.code} </p>
        );
    }
}

export default Home;