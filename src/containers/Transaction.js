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
            <a
              align='center'
              href={'https://rinkeby.etherscan.io/tx/' + transaction.hash}>
              {transaction.hash}
            </a>
            <br />
            <br />
          </div>
        </div>
      </div>
    )
  }
}
