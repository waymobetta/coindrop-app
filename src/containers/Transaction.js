import React, { Component } from 'react'
import './Transaction.css'

export default class Transaction extends Component {
  render () {
    const { transaction } = this.props

    return (
      <div className='Transaction'>
        <div className='col'>
          <div
            className='Transaction-information'>
            <p align='center'>
              {transaction.hash}<br /><br />
            </p>
          </div>
        </div>
      </div>
    )
  }
}
