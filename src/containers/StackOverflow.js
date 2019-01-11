import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Button } from "reactstrap";
import {
  Glyphicon
} from "react-bootstrap";
import StackOverflowModule from "../util/StackOverflow";
import "./StackOverflow.css";

export default class StackOverflow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: "",
			verificationCode: "",
			isVerified: false
		}
	}

	async componentWillMount() {
		try {
	    const currentSession = await Auth.currentSession();

	    this.setState({
	      userID: currentSession.accessToken.payload.username
	    });
	  	
	  	const stackUserInfo = await StackOverflowModule.getUser(this.state.userID);

	  	if (stackUserInfo.message.info.id > 0) {
				if (stackUserInfo.message.info.stackoverflow_data.verification_data.is_verified) {
				  this.setState({
				    isVerified: true
				  });
				}
				this.setState({
					verificationCode: stackUserInfo.message.info.stackoverflow_data.verification_data.stored_verification_code
				});
			}
		} catch (e) {
			alert(e.message);
		}
	}

	validateClick() {
    if (this.state.isVerified) {
      return true;
    }
    return false;
	}

	handleClick = event => {
		try {
			StackOverflowModule.validateVerificationCode(this.state.userID);
		} catch (e) {
			alert(e.message);
		}
	}

  render() {
    return (
      <div className="StackOverflow">
        <div className="lander">
          <h1>stack overflow</h1>
          <p>verification code</p>
          <div>
          	<strong>code: </strong>{this.state.verificationCode}
          </div>
          <div>
          	<br/>
          	<i>already posted this code? click verify below to check </i>
          </div>
          <Button
          	className="button--cd btn btn-outline-primary"
          	outline
          	color="primary"
          	block
          	onClick={event => {
          		this.handleClick(event)}}
          	disabled={this.validateClick()}>
          	verify!
          </Button>
          <div>
	          {this.state.isVerified
						  ? <span role="img" description="aria-label"><span id="AccountSpanSuccess">verified </span> <Glyphicon glyph="ok"/></span>
						  : <span role="img" description="aria-label"><span id="AccountSpanFail">not verified</span> <Glyphicon glyph="remove"/></span>}
					</div>
        </div>
      </div>
    );
  }
}
