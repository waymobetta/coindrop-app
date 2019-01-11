import React, { Component } from 'react';
import { Button, Collapse, Well } from "react-bootstrap";
import { TaskList, generateTaskListVars } from "./TaskList";
import './Task.css';

export default class Badge extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	componentWillRender = () => {
		console.log("task render");

		let newStateObj = {}

    const taskListVars = generateTaskListVars(TaskList);

    for (let i = 0; i < taskListVars.length; i++) {
      newStateObj[taskListVars[i]] = false;
    }

		this.setState({
			taskList: TaskList
		});
	}

	handleClick = taskVar => {
		switch (taskVar) {
			case (taskVar === "isTaskOneOpen"):
				return this.setState({
					isTaskOneOpen: !this.state.isTaskOneOpen
				});
			case (taskVar === "isTaskTwoOpen"):
				return this.setState({
					isTaskTwoOpen: !this.state.isTaskTwoOpen
				});
			default:
				return
		}
	}

	renderTasks(task) {
		const taskListVars = generateTaskListVars(TaskList);

		for (let i = 0; i < taskListVars.length; i++) {

			return (
				<div>
					<Button
						className="TaskButton"
						onClick={this.handleClick(taskListVars[i])}>
						<div id="task">
							{task.name}
						</div>
					</Button>
		      <Collapse in={this.state.isTaskOneOpen}>
	          <Well>
	          	{task.description}<br/><br/>
	              <strong>Rewards:</strong><br/>
	              Token allocation: <i>{task.allocation}</i><br/>
	              Badge: <a href="/badges">{task.badge}</a>
	          </Well>
		      </Collapse>
	      </div>
			);
		}
	}

	render() {	
		
		const { task } = this.props;

		return (
			<div className="Task">
				<ol>
					<div className="Task-information">
						<li>
							{this.renderTasks(task)}
	        			</li>
	       			</div>
				</ol>
			</div>
		);
	}
}
