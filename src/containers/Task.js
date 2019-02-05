import React, { Component } from 'react';
import { UncontrolledCollapse } from "reactstrap";
import LoaderButton from "../components/LoaderButton";
import { Button, Well } from "react-bootstrap";
import Quiz from "../util/Quiz";
import './Task.css';

export default class Task extends Component {
	constructor(props) {
		super(props);


		this.state = {
			isOpen: false,
			quizScore: null,
			isEnlisting: false
		}
	}

	componentWillMount = async () => {
		const { task, userID, token } = this.props;

		if (task.type === 'quiz') {

			const quizObj = {
				title: task.title,
				userID: userID
			}

			const quizResultResponse = await Quiz.getResults(quizObj, token);
			if (quizResultResponse.status !== false) {
				const score = `${(quizResultResponse.message.questions_correct/(quizResultResponse.message.questions_correct + quizResultResponse.message.questions_incorrect))*100}%`
				this.setState({
					quizScore: score
				});
			}
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

	handleClick = e => {
		const pathArr = e.target.id.split('-');

    	const path = `/tasks/${pathArr[0]}/${pathArr[1]}`

    	this.props.history.push(path);
	}

	render() {
		const { task } = this.props;

		if (this.state.quizScore !== null) {
			task.is_completed = true;
		}

		return (
			<div className="Task">
		        <Button
		        	id={"toggler"+task.id}
		          className="TaskButton"
		          onClick={this.handleTaskClick}>
		          <div id="task">
		            {task.title} - <i><span style={{color:"black"}}>{task.type}</span></i> - {task.is_completed ? <span style={{color:"green"}}>completed</span> : <span style={{color:"orange"}}>not complete</span>}
		          </div>
		        </Button>
		        <UncontrolledCollapse toggler={"toggler"+task.id}>
		          <Well>
		            {task.description}<br/><br/>
		            <strong>Rewards:</strong><br/>
		            Token Allocation: <i>{task.token_allocation} {task.token}</i><br/>
		            Badge: <a href="/badges">{task.badge_data.name}</a><br />
		            {
		            		(task.type === 'quiz' && this.state.quizScore === null)
		            		? <span>Score: <span style={{color:"red"}}>no score</span></span>
		            		: task.type === 'quiz'
		            		 ? <span>Score: <span style={{color:"green"}}>{this.state.quizScore}</span></span>
		            		 : <span></span>
		            }<br />
		            <LoaderButton
		              block
                      id={`${task.author}-${task.title}`}
		              className="button--cd btn btn-outline-primary"
		              outline
		              color="primary"
					  onClick={this.handleClick}
		              type="submit"
		              disabled={task.is_completed}
		              text="enlist"
            		/>
		          </Well>
		        </UncontrolledCollapse>
      		</div>
		);
	}
}
