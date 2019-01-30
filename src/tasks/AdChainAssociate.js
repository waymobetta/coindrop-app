import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Button } from "reactstrap";
import {
  Well,
  Glyphicon
} from "react-bootstrap";
// import EtherscanModule from "../util/Etherscan";
import "./AdChainAssociate.css";

export default class ContractInteraction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      isVerified: false
    }
  }

  async componentWillMount() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      const jwt = currentUser.signInUserSession.accessToken.jwtToken;

      this.setState({
        userID: currentUser.signInUserSession.accessToken.payload.username,
        token: jwt
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  validateClick() {
    if (this.state.isVerified) {
      return true;
    }
    return false;
  }

  handleClick = async event => {
    try {
      // const validationResponse = await EtherscanModule.validateContractInteraction(this.state.userID, this.state.token);

      // simulate successful response
      const validationResponse = {
        message: 'success'
      }

      console.log('checking etherscan..')

      if (validationResponse.message === "success") {
        this.setState({
          isVerified: true
        });
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  render() {
    return (
      <div
        align="center"
        className="ContractInteraction">
        <div className="lander">
          <h1>adchain associate</h1>
          <p>Prove you interacted with our contract!</p>
          <div
            className="CodeDiv">
            <div
              className="Divider">
            </div>
          <br />
          </div>
          <div
            align="center"
            className="WellDiv">
            <Well
              bsSize="large">
              <h2>Apply a domain to the <a href="http://staging-redesign.adchain.com/" target="_blank" rel="noopener noreferrer">adChain Registry</a> to be eligible for the rewards!
              </h2>
            </Well>
            </div>
            <p>
              <i style={{color: "grey"}}>
              FRAUDSTERS BEWARE! Impersonating a user who has already applied a domain to the registry may seem like a good idea, but what you will be doing is simply passing your rewards on to them..
              </i>
            </p>
          </div>
          <div>
            <br/>
            <i>already applied a domain? click verify below to check </i>
          </div>
          <Button
            className="button--cd btn btn-outline-primary"
            outline
            color="primary"
            block
            onClick={this.handleClick}
            disabled={this.validateClick()}>
            verify
          </Button>
          <div>
            {this.state.isVerified
              ? <span role="img" description="aria-label"><span id="AccountSpanSuccess">verified </span> <Glyphicon glyph="ok"/></span>
              : <span role="img" description="aria-label"><span id="AccountSpanFail">not verified</span> <Glyphicon glyph="remove"/></span>}
        </div>
      </div>
    );
  }
}
