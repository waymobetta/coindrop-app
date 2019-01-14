import React, { Component } from "react";
import "./ChangePasswordSuccess.css";

export default class ChangePasswordSuccess extends Component {
  render() {
    return (
      <div className="ChangePasswordSuccess">
        <div className="lander">
          <h1 align="center">success!</h1>
          <p align="center">Successfully updated password</p>
          <p align="center">click <a href="/profile">here</a> to return to your profile</p>
        </div>
      </div>
    );
  }
}
