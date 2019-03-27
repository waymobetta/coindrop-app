import React, { Component } from 'react'
import { UncontrolledCollapse } from 'reactstrap'
import LoaderButton from '../components/LoaderButton'
import { Button, Well } from 'react-bootstrap'
// import QuizModule from '../util/Quiz'
import BadgesModule from '../util/Badges'
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

    if (task.type === 'Quiz') {
      console.log(task.type)
      //   const quizResultResponse = await Quiz.getResults(task.title, token)
      //   quizResultResponse = false
      //   if (quizResultResponse.status !== false) {
      //     const score = `${(quizResultResponse.message.questions_correct / (quizResultResponse.message.questions_correct + quizResultResponse.message.questions_incorrect)) * 100}%`
      //     this.setState({
      //       quizScore: score
      //     })
      //   }
    }

    // get badges
    const badgesResponse = await BadgesModule.getBadges(token)

    // get resources
    // const quizResponse = await QuizModule.
    this.setState({
      badges: badgesResponse
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

  handleClick (event) {
    const pathArr = event.target.id.split('-')

    const path = `/tasks/${pathArr[0]}/${pathArr[1]}`

    this.props.history.push(path)
  }

  render () {
    const { task } = this.props

    let badgeName
    let badgePath
    let badgeLogoURL

    this.state.badges.map(badge => {
      if (task.badge.id === badge.id) {
        badgeName = badge.name
        badgeLogoURL = badge.logoURL
        badgePath = `/badges/${badge.name}`
      }
    })

    if (this.state.quizScore !== null) {
      task.completed = true
    }

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
          <Well>
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
            <strong>Rewards:</strong><br />
Token Allocation: <i>{task.tokenAllocation} {task.token}</i><br />
Badge: <a href={badgePath}>{badgeName}</a>
            <img
              className='badgeLogo'
              alt=''
              width='40'
              height='32'
              src={badgeLogoURL}
            /><br />
            {
              (task.type === 'Quiz' && this.state.quizScore === null)
                ? <span>Score: <span style={{ color: 'red' }}>no score</span></span>
                : task.type === 'Quiz'
                  ? <span>Score: <span style={{ color: 'green' }}>{this.state.quizScore}</span></span>
                  : <span />
            }<br />
            <LoaderButton
              block
              id={`${task.author}-${task.title}`}
              className='button--cd btn btn-outline-primary'
              outline
              color='primary'
              onClick={this.handleClick}
              type='submit'
              disabled={task.is_completed}
              text='enlist'
            />
          </Well>
        </UncontrolledCollapse>
      </div>
    )
  }
}
