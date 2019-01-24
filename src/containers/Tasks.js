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
      token: "",
      tasks: []
    }
  }

  componentWillMount = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      const userID = currentUser.signInUserSession.accessToken.payload.username;
      const jwt = currentUser.signInUserSession.accessToken.jwtToken;

      this.setState({
        userID: userID,
        token: jwt
      });

      const tasksForUser = await TasksModule.getTasksForUser(userID, jwt);

      if (tasksForUser.status === true) {
        this.setState({
          tasks: tasksForUser.message.tasks
        });
      }

    } catch (e) {
      console.error(e.message);
    }
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
                  <Task key={"Task_" + task.id} task={task} userID={this.state.userID} token={this.state.token} history={this.props.history} />
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
        {
          this.state.tasks.length <= 0
            ? this.renderNoTasks()
            : this.renderTasks()
        }
      </div>
    );
  }
}
