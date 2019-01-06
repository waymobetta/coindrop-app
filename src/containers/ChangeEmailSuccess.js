import React, { Component } from "react";
import "./ChangeEmailSuccess.css";

export default class ChangeEmailSuccess extends Component {
  render() {
    return (
      <div className="ChangeEmailSuccess">
        <div className="lander">
          <h1 align="center">Success!</h1>
          <p align="center">Successfully updated email.</p>
          <p align="center">Click <a href="/profile">here</a> to return to your profile</p>
        </div>
      </div>
    );
  }
}
