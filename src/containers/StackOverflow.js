import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Button } from "reactstrap";
import StackOverflowModule from "../util/StackOverflow";
import "./StackOverflow.css";

export default class StackOverflow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: "",
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

	  	if (stackUserInfo.info.id > 0) {
				if (stackUserInfo.info.stackoverflow_data.verification_data.is_verified) {
				  this.setState({
				    isVerified: true
				  });
				}
			}
		} catch (e) {
			alert(e.message);
		}
	}

	validateClick() {
    if (this.state.isVerified) {
      return false;
    }
  }

	handleClick = async event => {
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
          <h1>Stack Overflow</h1>
          <Button
						className="button--cd btn btn-outline-primary"
          	outline
          	color="primary"
          	block
          	onClick={event => {
          		this.handleClick(event)}}
          	disabled={!this.validateClick()}>
          	Validate!
          </Button>
        </div>
      </div>
    );
  }
}
