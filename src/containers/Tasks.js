import React, { Component } from "react";
import { Button } from "reactstrap";
import { Collapse, Well } from "react-bootstrap";
import { TaskList } from "./TaskList";
import "./Tasks.css";

export default class Tasks extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      isEnlisting: false,
      taskList: []
    }
  } 

  componentWillMount = () => {
    this.setState({
      taskList: TaskList
    }); 
  }

  handleClick(event, taskName) {
    if (taskName === "adchain acknowledged") {
      this.setState({
        isEnlisting: true
      });

      this.props.history.push("/tasks/adchainacknowledged");
    } else if (taskName === "colony contributor") {
      this.setState({
        isEnlisting: true
      });

      this.props.history.push("/tasks/colonycontributor");
    }

    console.log(event.message);
  }
 
  render() {
    return (
      <div className="Tasks">
        <div className="lander">
          <h1>tasks</h1>
          <ol>
            <li>
              <Button
                className="TaskButton"
                onClick={() => this.setState({ isTaskOneOpen: !this.state.isTaskOneOpen })}>
                <div id="task">
                  Colony - Promotion
                </div>
              </Button>
            </li>
            <Collapse in={this.state.isTaskOneOpen}>
              <div>
                <Well>
                  The Colony project would like to invite you to help promote its upcoming token distrubtion event.<br/><br/> Click <a href="/tasks/current/colonycontributor">here</a> if you are interested! <br/><br/>
                  <strong>Rewards:</strong><br/>
                  Token allocation: <i>2500 Colony Network Token</i><br/>
                  Badge: <a href="/badges">colony contributor</a>
                  <div align="right">
                    <Button
                      className="button--cd btn btn-outline-primary"
                      outline
                      color="primary"
                      block
                      align="right"
                      type="submit"
                      onClick={event => {
                        this.handleClick(event, "colony contributor")}}>
                      Enlist!
                    </Button>
                  </div>
                </Well>
              </div>
            </Collapse>
            <li>
              <Button 
                className="TaskButton"
                onClick={() => this.setState({ isTaskTwoOpen: !this.state.isTaskTwoOpen })}>
                <div id="task">
                  adChain - Action
                </div>
              </Button>
            </li>
            <Collapse in={this.state.isTaskTwoOpen}>
              <div>
                <Well>
                  adChain needs your help! <br/><br/>The adChain team would like you to help them better regulate its TCR, the adChain Registry. Based on your talents, you seem like an ideal candidate for the task!<br/><br/>Click <a href="/tasks/current/adchainacknowledged">here</a> to read a more detailed briefing! <br/><br/>

                    <strong>Rewards:</strong><br/>
                    Token allocation: <i>10000 adToken</i><br/>
                    Badge: <a href="/badges">adChain acknowledged</a>
                  <div align="right">
                    <Button
                      className="button--cd btn btn-outline-primary"
                      outline
                      color="primary"
                      block
                      align="right"
                      type="submit"
                      onClick={event => {
                        this.handleClick(event, "adchain acknowledged")}}>
                      Enlist!
                    </Button>
                  </div>
                </Well>
              </div>
            </Collapse>
          </ol>
        </div>
      </div>
    );
  }
}
