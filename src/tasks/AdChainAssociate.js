import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Button } from 'reactstrap'
import {
  Well,
  Glyphicon
} from 'react-bootstrap'
import TasksModule from '../util/Tasks'
// import EtherscanModule from "../util/Etherscan";
import './AdChainAssociate.css'

export default class ContractInteraction extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '1e0cf398-b729-4a9c-9d26-0260ac6acb90',
      isVerified: false,
      tasks: []
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()

      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      const tasksResp = await TasksModule.getTasksForUser(this.state.userID, jwt)

      this.setState({
        token: jwt,
        tasks: tasksResp.tasks
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  validateClick () {
    if (this.state.isVerified) {
      return true
    }
    return false
  }

  async handleClick (event) {
    try {
      // const validationResponse = await EtherscanModule.validateContractInteraction(this.state.userID, this.state.token);

      // simulate successful response
      const validationResponse = {
        message: 'success'
      }

      console.log('checking etherscan..')

      if (validationResponse.message === 'success') {
        this.setState({
          isVerified: true
        })
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  render () {
    let tokenName
    let tokenAmount
    let badgeName
    let badgeLogoURL
    let taskTitle

    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i].title === 'Associate') {
        tokenName = this.state.tasks[i].token
        taskTitle = this.state.tasks[i].title
        tokenAmount = this.state.tasks[i].tokenAllocation
        badgeName = this.state.tasks[i].badge.name
        badgeLogoURL = this.state.tasks[i].badge.logoURL
      }
    }
    return (
      <div
        align='center'
        className='ContractInteraction'>
        <div className='lander'>
          <p
            className='TaskTitle'
            style={{ color: '#6b3eff', 'font-size': '18pt' }}>
            {taskTitle}
          </p>
          <p>Prove you interacted with our contract!</p>
          <div
            className='CodeDiv'>
            <div
              className='Divider' />
            <br />
          </div>
          <div
            align='center'
            className='WellDiv'>
            <Well
              bsSize='large'>
              <h2>Apply a domain to the <a href='http://staging-redesign.adchain.com/' target='_blank' rel='noopener noreferrer'>adChain Registry</a> to be eligible for the rewards!
              </h2>
              <Well className='rewardsWell'>
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
    Token Allocation: <i>{tokenAmount} {tokenName}</i><br />
    Badge: <a href='/badges'>{badgeName}</a>
                <img
                  className='badgeLogo'
                  alt=''
                  width='40'
                  height='32'
                  src={badgeLogoURL}
                /><br />
              </Well>
            </Well>
          </div>
          <p>
            <i style={{ color: 'darkred' }}>
            FRAUDSTERS BEWARE!
            </i><br />
            <i style={{ color: 'grey' }}>
              Impersonating a user who has already applied a domain to the registry may seem like a good idea, but what you will be doing is simply passing your rewards on to them..
            </i>
          </p>
        </div>
        <div>
          <br />
          <i>Already applied a domain? Click verify below to check </i>
        </div>
        <Button
          className='button--cd btn btn-outline-primary'
          outline
          color='primary'
          block
          onClick={event => this.handleClick()}
          disabled={this.validateClick()}>
            verify
        </Button>
        <div>
          {this.state.isVerified
            ? <span role='img' description='aria-label'><span id='AccountSpanSuccess'>verified </span> <Glyphicon glyph='ok' /></span>
            : <span role='img' description='aria-label'><span id='AccountSpanFail'>not verified</span> <Glyphicon glyph='remove' /></span>}
        </div>
      </div>
    )
  }
}
