import React, { Component } from "react";
import { Auth } from "aws-amplify";
import RedditModule from "../util/Reddit";
import "./Reddit.css";

export default class Reddit extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

  async componentWillMount() {
  	try {
  		const currentSession = await Auth.currentSession();

  		this.setState({
  			userID: currentSession.accessToken.payload.username
  		});

  	} catch (e) {
  		alert(e.message);
  	}
  }

  async componentDidMount() {
  	try {
  		const redditUser = await RedditModule.getUser(this.state.userID);

  		console.log(redditUser);
  	}	catch (e) {
  		alert(e.message);
  	}
  }

  render() {
    return (
      <div className="Reddit">
        <div className="lander">
          <h1>Reddit</h1>
        </div>
      </div>
    );
  }
}
