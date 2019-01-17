import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Reddit from "../util/Reddit";
import "./Test.css";

export default class Test extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	componentWillMount = async () => {
		const currentUser = await Auth.currentAuthenticatedUser();

    const jwt = currentUser.signInUserSession.accessToken.jwtToken;
		const user = currentUser.signInUserSession.accessToken.payload.username;

    const redditUserResponse = await Reddit.getUser(user, jwt)
    console.log(redditUserResponse.message);
	}

  render() {
    return (
      <div className="Test">
        <div className="lander">
          <h1>test</h1>
        </div>
      </div>
    );
  }
}
