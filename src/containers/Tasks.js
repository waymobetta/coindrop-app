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
      const currentSession = await Auth.currentSession();

      this.setState({
        userID: currentSession.accessToken.payload.username
      });

      const tasks = await TasksModule.getTasks();

      this.setState({
        tasks: tasks.message.tasks
      });

    } catch (e) {
      alert(e.message);
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
                  return <li><Task key={"Task_"+task.id} task={task} /></li>
                })
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}
