import React, { Component } from "react";
import {
  Glyphicon,
  Collapse
} from "react-bootstrap";
import { Button } from "reactstrap";
import "./Accounts.css";

export default class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redditUsername: "",
      stackOverflowUserID: "",
      isVerifyingReddit: false,
      isVerifyingStackOverflow: false,
      redditVerified: true,
      stackOverflowVerified: false,
      isRedditDropOpen: false,
      isStackOverflowDropOpen: false
    };
  }

  validateRedditForm() {
    return this.state.redditUsername.length > 0;
  }

  validateStackOverflowForm() {
    return this.state.stackOverflowUserID.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (event, account) => {
    if (account === "reddit") {
      this.setState({
        isVerifyingReddit: true
      });

      this.props.history.push("/accounts/reddit")
    } else if (account === "stackOverflow") {
      this.setState({
        isVerifyingStackOverflow: true
      });

      this.props.history.push("/accounts/stackoverflow")
    }
    console.log(event.message);
  }

  render() {
    return (
      <div className="Accounts">
        <div className="lander">
          <h1>accounts</h1>
          <div id="account">
            <Button 
              className="TaskButton"
              onClick={() => this.setState({ isRedditDropOpen: !this.state.isRedditDropOpen })}>
              {this.state.redditVerified
                ? <span role="img" description="aria-label"><span id="AccountSpan">Reddit</span> <Glyphicon glyph="ok"/></span>
                : <span role="img" description="aria-label"><span id="AccountSpan">Reddit</span> <Glyphicon glyph="remove"/></span>}
            </Button>
            <Collapse in={this.state.isRedditDropOpen}>
              <div align="center">
                <nav className="navbar navbar-light bg-light">
                  <form className="form-inline">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      id="redditUsername"
                      placeholder="coindrop_bob"
                      aria-label="Verify"
                      onChange={this.handleChange}
                      />
                    <Button
                      color="success"
                      className="SuccessButton"
                      type="submit"
                      onClick={event => {
                        this.handleSubmit(event, "reddit")}}
                      disabled={!this.validateRedditForm()}>
                      verify
                    </Button>
                  </form>
                </nav>
              </div>
            </Collapse>
          </div>
          <div>
            <Button 
              className="TaskButton"
              onClick={() => this.setState({ isStackOverflowDropOpen: !this.state.isStackOverflowDropOpen })}>
              {this.state.stackOverflowVerified
                ? <span role="img" description="aria-label"><span id="AccountSpan">Stack Overflow</span> <Glyphicon glyph="ok"/></span>
                : <span role="img" description="aria-label"><span id="AccountSpan">Stack Overflow</span> <Glyphicon glyph="remove"/></span>}
            </Button>
            <Collapse in={this.state.isStackOverflowDropOpen}>
              <div align="center">
                <nav className="navbar navbar-light bg-light">
                  <form className="form-inline">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      id="stackOverflowUserID"
                      placeholder="01234567890"
                      aria-label="verify"
                      onChange={this.handleChange}
                      />
                    <Button
                      color="success"
                      className="SuccessButton"
                      type="submit"
                      onClick={event => {
                        this.handleSubmit(event, "stackOverflow")}}
                      disabled={!this.validateStackOverflowForm()}>
                      verify
                    </Button>
                  </form>
                </nav>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}
