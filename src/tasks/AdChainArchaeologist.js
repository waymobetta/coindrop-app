import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { UncontrolledAlert } from 'reactstrap';
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import Info from "../components/Info";
import "./AdChainArchaeologist.css";

export default class AdChainArchaeologist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isQuizSubmitted: false,
      qOneAns: "",
      qTwoAns: "",
      qThreeAns: "",
      qFourAns: "",
      qFiveAns: ""
    }
  }

  // componentWillMount = async () => {
  //   try {
  //     const currentUser = await Auth.currentAuthenticatedUser();

  //     const jwt = currentUser.signInUserSession.accessToken.jwtToken;

  //     this.setState({
  //       userID: currentUser.signInUserSession.accessToken.payload.username,
  //       token: jwt
  //     });

  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    const quizObj = {
      qOneAns: "",
      qTwoAns: ""
    }

    try {
      // send quiz results to backend
      // if response == "success"

      this.setState({
          isQuizSubmitted: true
      });

      this.props.history.push("/task/adchainarchaeologist/success")
    } catch (e) {
      console.error(e.message);
      this.setState({
        isLoading: false
      });
    }
  }

  validateForm = () => {
    return (
      this.state.qOneAns.length > 0 &&
      this.state.qTwoAns.length > 0 &&
      this.state.qThreeAns.length > 0 &&
      this.state.qFourAns.length > 0 &&
      this.state.qFiveAns.length > 0
    );
  }
  
  render() {
    return (
      <div
        align="center"
        className="TaskAuthor">
        <h1>adChain</h1>
        <p
          className="TaskTitle">
          archaeologist
        </p>
        <br />
        <Info
          className="InfoDescription"
          description={
            "Welcome to the archaeologist quiz. Each correct question will reward token. Each incorrect question will not. You only get 1 chance. Good luck!"
        } />
        <br />
        <div 
          align="center"
          className="TaskBuilderForm">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="qOneAns">
              <div
                align="left">
              <ControlLabel>question 1:</ControlLabel>
              </div>
              <p>What is the adChain Registry?</p>
              <FormControl
                autoFocus
                type="text"
                placeholder="answer"
                onChange={this.handleChange}
                value={this.state.qOneAns}
              />
            </FormGroup>
            <br />
            <FormGroup controlId="qTwoAns">
              <div
                align="left">
              <ControlLabel>question 2:</ControlLabel>
              </div>
              <p>What is the name of the cryptocurrency used to curate the adChain Publisher Registry?</p>
              <FormControl
                autoFocus
                type="text"
                placeholder="answer"
                onChange={this.handleChange}
                value={this.state.qTwoAns}
              />
            </FormGroup>
            <br />
            <FormGroup controlId="qThreeAns">
              <div
                align="left">
                <ControlLabel>question 3:</ControlLabel>
              </div>
              <p>What is the contract address of the previous cryptocurrency?</p>
              <i><Info
                description={
                  "Hint: use etherscan.io"
                }
                /></i>
              <FormControl
                type="text"
                placeholder="answer"
                onChange={this.handleChange}
                value={this.state.qThreeAns}
              />
            </FormGroup>
            <br />
            <FormGroup controlId="qFourAns">
              <div
                align="left">
                <ControlLabel>question 4:</ControlLabel>
              </div>
              <p>What is the contract address of the previous cryptocurrency?</p>
              <i><Info
                description={
                  "Hint: use etherscan.io"
                }
                /></i>
              <FormControl
                type="text"
                placeholder="answer"
                onChange={this.handleChange}
                value={this.state.qFourAns}
              />
            </FormGroup>
            <br />
            <FormGroup controlId="qFiveAns">
              <div
                align="left">
                <ControlLabel>question 5:</ControlLabel>
              </div>
              <p>What is the contract address of the previous cryptocurrency?</p>
              <i><Info
                description={
                  "Hint: use etherscan.io"
                }
                /></i>
              <FormControl
                type="text"
                placeholder="answer"
                onChange={this.handleChange}
                value={this.state.qFiveAns}
              />
            </FormGroup>
            <LoaderButton
              block
              className="button--cd btn btn-outline-primary"
              outline
              color="primary"
              type="submit"
              disabled={!this.validateForm()}
              isLoading={this.state.isTaskSubmitted}
              text="submit"
              loadingText="submitting task.."
            />
          </form>
        </div>
      </div>
    );
  }
}
