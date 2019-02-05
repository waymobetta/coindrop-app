import React, { Component } from "react";
import { Auth } from "aws-amplify";
import "./AdChainQuiz.css";
import Quiz from "../util/Quiz";

export default class AdChainArchaeologist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      token: "",
      isLoading: false,
      isQuizSubmitted: false
    }
  }

  async componentWillMount() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const jwt = currentUser.signInUserSession.accessToken.jwtToken;

      this.setState({
        userID: currentUser.signInUserSession.accessToken.payload.username,
        token: jwt
      });

    } catch (e) {
      console.error(e.message);
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });

    // TODO:
    // fix passing in quiz title
    const quizObj = {
      title: "archaeologist",
      userID: this.state.userID
    }

    try {
      // send quiz results to backend
      const postAnswerResponse = await Quiz.postAnswers(quizObj, this.state.token);

      if (postAnswerResponse.status === true) {
        this.setState({
          isQuizSubmitted: true
        });
      }

      // const quizResultsResponse = await Quiz.getResults(newQuizObj, this.state.token);

      this.props.history.push("/tasks/success")
    } catch (e) {
      console.error(e.message);
      this.setState({
        isLoading: false
      });
    }
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
        <div
          className="InfoDescription">
            Welcome to the archaeologist quiz! <br />Each correct question will reward token. Each incorrect question will not. <br />You only get 1 chance.<br /><br />Good luck!
        </div>
        <br />
        <iframe
          title="adChainVideo"
          width="750"
          height="315"
          src="https://www.youtube-nocookie.com/embed/iQD92lCxbM8"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
        <div
          className="typeform-widget"
          data-url="https://jon698.typeform.com/to/mDDkkK"
          data-transparency="50"
          data-hide-headers="true"
          data-hide-footer="true">
        </div>
        {
          (function() { var js,q,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })()
        }
      </div>
    );
  }
}
