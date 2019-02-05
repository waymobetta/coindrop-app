import React, { Component } from 'react'
import './TaskSubmissionSuccess.css'

export default class TaskSubmissionSuccess extends Component {
  render () {
    return (
      <div className='TaskSubmissionSuccess'>
        <div className='lander'>
          <h1 align='center'>success!</h1>
          <p align='center'>successfully completed task</p>
          <p align='center'>click <a href='/tasks'>here</a> to return to your tasks!</p>
        </div>
      </div>
    )
  }
}
