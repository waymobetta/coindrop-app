import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import TasksModule from "../util/Tasks";
import "./TaskBuilder.css";

export default class TaskBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      isTaskSubmitted: false,
      taskTitle: "wmb task 1",
      taskAuthor: "waymobetta",
      taskType: "select type",
      taskDescription: "test description",
      taskTokenName: "YEW",
      taskTokenAllocation: 2500,
      taskBadge: "wmb"
    }
  }

  componentWillMount = async () => {
    try {
      const currentSession = await Auth.currentSession();

      this.setState({
        userID: currentSession.accessToken.payload.username
      });

    } catch (e) {
      alert(e.message);
    }
  }

  validateForm() {
    return (
      this.state.taskTitle.length > 0 &&
      this.state.taskAuthor.length > 0 &&
      this.state.taskTokenName.length > 0 &&
      this.state.taskType !== "select type" &&
      this.state.taskBadge.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    const taskObj = {
      title: this.state.taskTitle,
      type: this.state.taskType,
      author: this.state.taskAuthor,
      description: this.state.taskDescription,
      token: this.state.taskTokenName,
      token_allocation: this.state.taskTokenAllocation,
      badge_data: {
        name: this.state.taskBadge
      }
    }

    try {
      await TasksModule.addTask(taskObj);

      this.setState({
        isTaskSubmitted: true
      });

      this.props.history.push("/taskbuilder/success")
    } catch (e) {
      alert(e.message);
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div
        align="center"
        className="TaskBuilder">
        <div className="lander">
          <h1>
            task builder
          </h1>
          <br />
          <div className="TaskBuilderForm">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="taskTitle">
                <ControlLabel>title</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  placeholder="my task title"
                  value={this.state.taskTitle}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="taskAuthor">
                <ControlLabel>author</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="my company name"
                  onChange={this.handleChange}
                  value={this.state.taskAuthor}
                />
              </FormGroup>
              <FormGroup controlId="taskType">
                <ControlLabel>type</ControlLabel>
                <FormControl 
                  componentClass="select"
                  onChange={this.handleChange}
                  value={this.state.taskType}>
                  <option
                    value="select type">
                    select type
                  </option>
                  <option
                    value="action">
                    action
                  </option>
                  <option
                    value="promotion">
                    promotion
                  </option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="taskDescription">
                <ControlLabel>description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder="my task description"
                    onChange={this.handleChange}
                    value={this.state.taskDescription}
                  />
                </FormGroup>
              <FormGroup controlId="taskTokenName">
                <ControlLabel>token name</ControlLabel>
                  <FormControl
                    type="text"
                    name="tokenName"
                    placeholder="my token symbol (e.g. ADT)"
                    onChange={this.handleChange}
                    value={this.state.taskTokenName}
                  />
              </FormGroup>
              <FormGroup controlId="taskTokenAllocation">
                <ControlLabel>token allocation</ControlLabel>
                  <FormControl
                    type="number"
                    name="tokenAllocation"
                    placeholder="2500"
                    onChange={this.handleChange}
                    value={this.state.taskTokenAllocation}
                  />
              </FormGroup>
              <FormGroup controlId="taskBadge">
                <ControlLabel>badge name</ControlLabel>
                  <FormControl
                    type="text"
                    name="badgeName"
                    placeholder="my task badge"
                    onChange={this.handleChange}
                    value={this.state.taskBadge}
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
      </div>
    )
  }
}
