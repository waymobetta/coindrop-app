import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import { Auth } from "aws-amplify";
import CoindropAuth from "../util/CoindropAuth";
import Reddit from "../util/Reddit";
import StackOverflow from "../util/StackOverflow";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      // TODO:
      // refactor this block

      ///////////////////////////////////

      try {
        setTimeout(async () => {
          await CoindropAuth.signUp(currentUser.username);
          console.log("Coindrop: ", currentUser.username);
        }, 250);
      } catch (e) {
        alert(e.message);
      }

      try {
        setTimeout(async () => {
          await Reddit.addUser(currentUser.username);
          console.log("Reddit: ", currentUser.username);
        }, 250);
      } catch (e) {
        alert(e.message);
      }

      try {
        setTimeout(async () => {
          await StackOverflow.addUser(currentUser.username);
          console.log("Stack: ", currentUser.username);
        }, 250);
      } catch (e) {
        alert(e.message);
      }

      ///////////////////////////////////

      this.props.history.push("/profile");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email">
          <ControlLabel>email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          className="button--cd btn btn-outline-primary"
          outline
          color="primary"
          type="submit"
          isLoading={this.state.isLoading}
          text="sign up"
          loadingText="signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.renderForm()}
      </div>
    );
  }
}
