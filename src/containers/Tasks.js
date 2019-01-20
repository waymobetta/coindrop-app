import React, { Component } from "react";
import { Auth } from "aws-amplify";
import TasksModule from "../util/Tasks";
import Task from "./Task";
import "./Tasks.css";

export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      isEnlisting: false,
      tasks: [],
    }
  }

  componentWillMount = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      const jwt = currentUser.signInUserSession.accessToken.jwtToken;

      this.setState({
        userID: currentUser.signInUserSession.accessToken.payload.username
      });

      const tasks = await TasksModule.getTasks(jwt);

      this.setState({
        tasks: tasks.message.tasks
      });

    } catch (e) {
      console.error(e.message);
    }
  }

  handleClick = e => {

    const pathArr = e.target.id.split('-');

    const path = `/tasks/${pathArr[0]}/${pathArr[1]}`
    this.props.history.push(path);
  }

  renderNoTasks() {
    return (
      <div className="lander">
        <h1>
          tasks
        </h1>
        <p>You have no tasks at the moment. Subscribe to the coindrop email service to be notiied when new tasks are available for you.</p>
      </div>
    )
  }

  renderTasks() {
    return (
      <div className="lander">
        <h1>
          tasks
        </h1>
        <div align="center">
          <ol>
            {
              this.state.tasks.map(task => {
                return <li key={"Item_" + task.id}>
                  <Task key={"Task_" + task.id} task={task} />
                  <button
                    id={`${task.author}-${task.title}`}
                    onClick={this.handleClick}
                    type="submit">
                    yo
                    </button>
                  <br />
                  <br />
                </li>
              })
            }
          </ol>
        </div>
      </div>
    )
  }

  render() { 
    return (
      <div className="Tasks">
        {this.state.tasks === null
          ? this.renderNoTasks()
          : this.renderTasks()}
      </div>
    );
  }
}
