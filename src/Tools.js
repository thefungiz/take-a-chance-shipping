import React, { Component } from "react";
import QRCode from 'qrcode.react'

class Tools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: null
        }
        this.theFunction = this.theFunction.bind(this)
    }

    theFunction(e) {
        let elemValue = e.target.value;
        this.setState({ code: elemValue })
    }

    render() {
        return (
            <div>
                <h1>Tools</h1>
                <div className="row">
                    <label>
                        Transaction ID:
    
                <input type="text" name="name" onChange={e => this.theFunction(e)} />
                    </label>
                </div>

                <QRCode value={'http://localhost:3000/#/qr/' + this.state.code} />
                <div className="row">
                    <a href={'http://localhost:3000/#/qr/' + this.state.code}>
                        Link Value
                </a>
                </div>
            </div>
        );
    }
}



export default Tools;