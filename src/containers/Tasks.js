import React, { Component } from 'react'
import { getTasks } from '../util/api'
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
      const tasksResp = await getTasks()

      // TODO:
      // badges endpoint to retrieve badge data

      this.setState({
        tasks: tasksResp
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  renderNoTasks () {
    return (
      <div className='lander'>
        <h1>
          tasks
        </h1>
        <p>You have no tasks at the moment. Subscribe to the coindrop email service to be notified when new tasks are available for you.</p>
      </div>
    )
  }

  renderTasks () {
    return (
      <div className='lander'>
        <h1>
          tasks
        </h1>
        <div align='center'>
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
