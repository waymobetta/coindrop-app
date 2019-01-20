import React, { Component } from 'react';
import { UncontrolledCollapse } from "reactstrap";
import LoaderButton from "../components/LoaderButton";
import { Button, Well } from "react-bootstrap";
import './Task.css';

export default class Task extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			isEnlisting: false
		}
	}

	handleTaskClick = e => {
		try {
			this.setState({
				isOpen: !this.state.isOpen
			});
		} catch (e) {
			console.error(e.message);
		}
	}

	render() {	
		
		const { task } = this.props;

		return (
			<div className="Task">
        <Button
        	id={"toggler"+task.id}
          className="TaskButton"
          onClick={this.handleTaskClick}>
          <div id="task">
            {task.title} - <i><span style={{color:"black"}}>{task.type}</span></i>
          </div>
        </Button>
        <UncontrolledCollapse toggler={"toggler"+task.id}>
          <Well>
            {task.description}<br/><br/>
            <strong>Rewards:</strong><br/>
            Token Allocation: <i>{task.token_allocation} {task.token}</i><br/>
            Badge: <a href="/badges">{task.badge_data.name}</a>
          </Well>
        </UncontrolledCollapse>
      </div>
		);
	}
}
