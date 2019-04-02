import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Well } from 'react-bootstrap'
import TasksModule from '../util/Tasks'
import {
  getUserId
} from '../util/api'
import Task from './Task'
import './Tasks.css'

export default class Tasks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      token: '',
      tasks: []
    }
  }

  async componentWillMount () {
    try {
      // const tasksResp = await getTasks()

      const currentUser = await Auth.currentAuthenticatedUser()

      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      getUserId().then(userID => {
        this.setState({
          userID: userID
        })
      })

      const tasksResp = await TasksModule.getTasksForUser(this.state.userID, jwt)

      this.setState({
        token: jwt,
        tasks: tasksResp.tasks
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  renderNoTasks () {
    return (
      <div className='lander'>
        <p className='badgeTitle'>
          Tasks
        </p>
        <p>
        Welcome to your task wall.<br /><br />Here you will be presented with tasks from projects based on their eligiblity requirements.<br />For example, a basic task requirement might include beloging to a project's Reddit community.
        </p>
        <Well>
          <p>
          You have no tasks at the moment. Subscribe to the coindrop email service to be notified when new tasks are available for you.
          </p>
        </Well>
      </div>
    )
  }

  renderTasks () {
    return (
      <div className='lander'>
        <p className='badgeTitle'>
          Tasks
        </p>
        <p>
        Here you will be presented with tasks from projects based on their eligiblity requirements.<br />For example, a basic task requirement might include beloging to a project's Reddit community.
        </p>
        <div align='center'>
          <Well className='tasksWell'>
            <ol>
              {
                this.state.tasks.map(task => {
                  return <li key={'Item_' + task.id}>
                    <Task key={'Task_' + task.id} task={task} userID={this.state.userID} token={this.state.token} history={this.props.history} />
                    <br />
                    <br />
                  </li>
                })
              }
            </ol>
          </Well>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='Tasks'>
        {
          this.state.tasks === null
            ? this.renderNoTasks()
            : this.renderTasks()
        }
      </div>
    )
  }
}
