import React, { Component } from "react";
import getWeb3 from './utils/getWeb3'

class Home extends Component {

    constructor(props) {
        super(props)
        let shippingId = props.match.params["sid"]
        this.state = {
            web3: null
        }
        if (shippingId) {
            this.state.sid = shippingId;
        }
    }

    componentWillMount() {
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    render() {
        return (
            <div className="container">
                <h2>Shipping</h2>
                <div>
                    <h4>Order ID: {this.state.sid}</h4>
                    <div className="row">
                        <div className="two columns">Buyer Initialization</div>
                        <div className="two columns">Pickup</div>
                        <div className="two columns">In-Transit</div>
                        <div className="two columns">Delivery</div>
                        <div className="two columns">Buyer Verification</div>
                        <div className="one column"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;