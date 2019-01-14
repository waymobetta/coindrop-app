import React, { Component } from 'react';
import { UncontrolledCollapse } from "reactstrap";
import { Button, Well } from "react-bootstrap";
import './Task.css';

export default class Task extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		}
	}

	handleClick = e => {
		try {
			this.setState({
				isOpen: !this.state.isOpen
			});
		} catch (e) {
			alert(e.message);
		}
	}

	render() {	
		
		const { task } = this.props;

		return (
			<div className="Task">
        <Button
        	id={"toggler"+task.id}
          className="TaskButton"
          onClick={event => {this.handleClick(event)}}>
          <div id="task">
            {task.title} - <i><span style={{color:"black"}}>{task.type}</span></i>
          </div>
        </Button>
        <UncontrolledCollapse toggler={"toggler"+task.id}>
          <Well>
            {task.description}<br/><br/>
            <strong>Rewards:</strong><br/>
            Token allocation: <i>{task.token_allocation}</i><br/>
            Badge: <a href="/badges">{task.badge_data.name}</a>
          </Well>
        </UncontrolledCollapse>
      </div>
		);
	}
}
