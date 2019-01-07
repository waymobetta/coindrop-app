import React, { Component } from "react";
import { Button, Collapse, Well } from "react-bootstrap";
import "./Tasks.css";

export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTaskOneOpen: false,
      isTaskTwoOpen: false
    };
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
                  The Colony project would like to invite you to help promote its upcoming token distrubtion event. Click <a href="https://colony.io/">here</a> if you are interested! <br/><br/>
                  <strong>Rewards:</strong><br/>
                  Token allocation: <i>5000 Colony Network Token</i><br/>
                  Badge: <a href="/badges">colony conscious</a>
                </Well>
              </div>
            </Collapse>
            <li>
              <Button 
                className="TaskButton"
                onClick={() => this.setState({ isTaskTwoOpen: !this.state.isTaskTwoOpen })}>
                <div id="task">
                  AdChain - Action
                </div>
              </Button>
            </li>
            <Collapse in={this.state.isTaskTwoOpen}>
              <div>
                <Well>
                  adChain needs your help! The adChain team would like you to help them better regulate its TCR, the adChain Registry. 

                    Based on your talents, you seem like an ideal candidate for the task! Click <a href="/tasks/adchainaction">here</a> to read a more detailed briefing! <br/><br/>

                    <strong>Rewards:</strong><br/>
                    Token allocation: <i>5000 AdToken</i><br/>
                    Badge: <a href="/badges">adChain associate</a>
                </Well>
              </div>
            </Collapse>
          </ol>
        </div>
      </div>
    );
  }
}
