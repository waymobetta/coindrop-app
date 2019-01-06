import React, { Component } from "react";
import { Auth } from "aws-amplify";
import "./Profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      wallet: "0x5bF50c00da77b1f3864Cae3C927d029750c040a8"
    };
  }

  async componentDidMount() {
    try {
      const currentUserInfo = await Auth.currentUserInfo();

      this.setState({
        email: currentUserInfo.attributes.email,
        username: currentUserInfo.username
      });
    }
    catch(e) {
      alert(e.message);
    }
  }

  render() {
    return (
      <div className="Profile">
        <div className="lander">
          <div align="center">
            <h1>Profile</h1>
            <img alt="profile_photo" src="https://user-images.githubusercontent.com/17755587/50730991-bd05d080-110e-11e9-836f-f9e9d7798a11.png" height="200" width="200"/>
            <p>&nbsp;</p>
            <p style={{ color: "#999" }}><i>{this.state.email}</i></p>
            <p>
              <strong>Ethereum Wallet: </strong>
                <a href={"https://etherscan.io/address/"+this.state.wallet}>
                  {this.state.wallet}
                </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
