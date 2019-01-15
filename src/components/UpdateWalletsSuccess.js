import React, { Component } from "react";
import "./UpdateWalletsSuccess.css";

export default class UpdateWalletsSuccess extends Component {
  render() {
    return (
      <div className="UpdateWalletsSuccess">
        <div className="lander">
          <h1 align="center">success!</h1>
          <p align="center">successfully updated wallets</p>
          <p align="center">click <a href="/profile">here</a> to return to your profile</p>
        </div>
      </div>
    );
  }
}
