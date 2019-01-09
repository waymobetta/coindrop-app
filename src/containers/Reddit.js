import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Button } from "reactstrap";
import RedditModule from "../util/Reddit";
import "./Reddit.css";

export default class Reddit extends Component {
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
	  	
	  	const redditUserInfo = await RedditModule.getUser(this.state.userID);

	  	if (redditUserInfo.info.id > 0) {
				if (redditUserInfo.info.reddit_data.verification_data.is_verified) {
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
			RedditModule.validateVerificationCode(this.state.userID);
		} catch (e) {
			alert(e.message);
		}
	}

  render() {
    return (
      <div className="Reddit">
        <div className="lander">
          <h1>Reddit</h1>
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
