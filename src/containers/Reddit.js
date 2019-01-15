import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Button } from "reactstrap";
import {
	Well,
	Glyphicon
} from "react-bootstrap";
import RedditModule from "../util/Reddit";
import "./Reddit.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class Reddit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: "",
			verificationCode: "",
			codeCopied: false,
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

	  	if (redditUserInfo.message.info.id > 0) {
				if (redditUserInfo.message.info.reddit_data.verification_data.is_verified) {
				  this.setState({
				    isVerified: true
				  });
				}
				this.setState({
					verificationCode: redditUserInfo.message.info.reddit_data.verification_data.stored_verification_code
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

	handleClick = async event => {
		try {
			const validationResponse = await RedditModule.validateVerificationCode(this.state.userID);

			if (validationResponse.message === "success") {
				this.setState({
					isVerified: true
				});
			}
		} catch (e) {
			alert(e.message);
		}
	}

  render() {
    return (
      <div 
      	align="center"
      	className="Reddit">
        <div className="lander">
          <h1>reddit</h1>
          <p>verification code</p>
          <div
          	className="CodeDiv">
          	<strong>code: </strong>{this.state.verificationCode}
          		<div
          			className="Divider">
          		</div>
          	<CopyToClipboard
          		text={this.state.verificationCode}
          		onCopy={() => this.setState({codeCopied: true})}>
          		<span 
          			role="img"
          			description="aria-label">
          			<Glyphicon glyph="pushpin"/>
          		</span>
        	</CopyToClipboard>
	        	{this.state.codeCopied
	        		? <span style={{color: '#9836B8'}}>copied</span>
	        		: null}
          </div>
          <br />
          <div
          	align="center"
          	className="WellDiv">
          	<Well
          		bsSize="small">
	          	<h2>please paste this code in the <u>title</u> section of a new post <a href="https://www.reddit.com/r/testing_QA_adChain/submit" target="_blank" rel="noopener noreferrer">here</a> at the coindrop subreddit
	          	</h2>
          	</Well>
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
      </div>
    );
  }
}
