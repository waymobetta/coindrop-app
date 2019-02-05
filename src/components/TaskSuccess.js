import React, { Component } from 'react'
import './TaskBuilderSuccess.css'

export default class TaskBuilderSuccess extends Component {
  render () {
    return (
      <div className='TaskBuilderSuccess'>
        <div className='lander'>
          <h1 align='center'>success!</h1>
          <p align='center'>successfully added task</p>
          <p align='center'>click <a href='/taskbuilder'>here</a> to return to the task builder!</p>
        </div>
      </div>
    )
  }
}
