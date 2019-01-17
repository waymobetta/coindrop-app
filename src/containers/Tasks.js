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

  render() {  
    return (
      <div className="Tasks">
        <div className="lander">
          <h1>
            tasks
          </h1>
          <div align="center">
            <ol>
              {
                this.state.tasks.map(task => {
                  return <li><Task key={"Task_" + task.id} task={task} /></li>
                })
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}
