import React, { Component } from 'react'
import { UncontrolledCollapse } from 'reactstrap'
import LoaderButton from '../components/LoaderButton'
import { Button, Well } from 'react-bootstrap'
import QuizModule from '../util/Quiz'
import './Task.css'

export default class Task extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
      quizScore: null,
      isEnlisting: false,
      badges: []
    }
  }

  async componentWillMount () {
    const { task, token } = this.props
    const quizResultResponse = await QuizModule.getResults(task.resourceId, token)
    const score = `${(quizResultResponse.questionsCorrect / (quizResultResponse.questionsCorrect + quizResultResponse.questionsIncorrect)) * 100}%`
    this.setState({
      quizScore: score
    })
  }

  handleTaskClick (event) {
    try {
      this.setState({
        isOpen: !this.state.isOpen
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  handleClick (event, taskAuthor, taskName) {
    try {
      const path = `/tasks/${taskAuthor.toLowerCase()}/${taskName.toLowerCase()}`
      this.props.history.push(path)
    } catch (err) {
      console.error(err.message)
    }
  }

  render () {
    const { task } = this.props

    return (
      <div className='Task'>
        <Button
          id={'toggler' + task.id}
          className='TaskButton'
          onClick={event => this.handleTaskClick(event)}>
          <div id='task'>
            {task.title} - <i><span style={{ color: 'black' }}>{task.type}</span></i> - {task.completed ? <span style={{ color: 'green' }}>completed</span> : <span style={{ color: 'orange' }}>not complete</span>}
          </div>
        </Button>
        <UncontrolledCollapse toggler={'toggler' + task.id}>
          <Well className='taskWell'>
            <strong>
              Author:&nbsp;
            </strong>
            <span
              style={{
                color: 'purple'
              }}
            >
              {task.author}
            </span>
            <br /><br />
            <i
              style={{
                color: 'darkblue'
              }}>
              {task.description}<br /><br />
            </i>
            <Well
              className='rewardWell'>
              <strong>
                <span
                  style={{ color: 'red' }}>
                  R
                </span>
                <span
                  style={{ color: 'green' }}>
                  E
                </span>
                <span
                  style={{ color: 'blue' }}>
                  W
                </span>
                <span
                  style={{ color: 'red' }}>
                  A
                </span>
                <span
                  style={{ color: 'blue' }}>
                  R
                </span>
                <span
                  style={{ color: 'green' }}>
                  D
                </span>
                <span
                  style={{ color: 'red' }}>
                  S
                </span>
              </strong><br />
  Token Allocation: <i>{task.tokenAllocation} {task.token}</i><br />
  Badge: <a href='/badges'>{task.badge.name}</a>
              <img
                className='badgeLogo'
                alt=''
                width='40'
                height='32'
                src={task.badge.logoURL}
              /><br />
              {
                (task.type === 'Quiz' && this.state.quizScore === null)
                  ? <span>Score: <span style={{ color: 'red' }}>no score</span></span>
                  : task.type === 'Quiz'
                    ? <span>Score: <span style={{ color: 'green' }}>{this.state.quizScore}</span></span>
                    : <span />
              }<br />
            </Well>
            <LoaderButton
              block
              id={`${task.author}-${task.title}`}
              className='button--cd btn btn-outline-primary'
              outline
              color='primary'
              onClick={event => this.handleClick(event, task.author, task.badge.name)}
              type='submit'
              disabled={task.completed}
              text='enlist'
            />
          </Well>
        </UncontrolledCollapse>
      </div>
    )
  }
}
