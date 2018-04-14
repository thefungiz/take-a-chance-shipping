import React, { Component } from "react";
 
class Home extends Component {

    constructor(props) {
        super(props)
        
        this.state = {};
        this.state.code = props.match.params["code"];
      }

  render() {
    return (
      <p>qr {this.state.code} </p>
    );
  }
}
 
export default Home;