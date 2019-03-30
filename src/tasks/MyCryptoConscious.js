import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import {
  Well,
  Glyphicon
} from 'react-bootstrap'
import './MyCryptoConscious.css'
import TasksModule from '../util/Tasks'
// import WalletModule from '../util/Wallet'

export default class MyCryptoConscious extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '1e0cf398-b729-4a9c-9d26-0260ac6acb90',
      message: '',
      isCompleted: false,
      tasks: [],
      token: ''
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      const tasksResp = await TasksModule.getTasksForUser(this.state.userID, jwt)

      this.setState({
        userID: currentUser.signInUserSession.accessToken.payload.username,
        userName: currentUser.attributes.email,
        tasks: tasksResp.tasks,
        token: jwt
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  async handleClick (event) {
    try {
      // const validationResponse = await WalletModule.verifyMessage(this.state.message, this.state.token);

      // simulate successful response
      const validationResponse = {
        message: 'success'
      }

      console.log('verifying message..')

      if (validationResponse.message === 'success') {
        this.setState({
          isVerified: true
        })
      }
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

  render () {
    let tokenName
    let taskTitle
    let tokenAmount
    let badgeName
    let badgeLogoURL
    let resourceURL

    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i].title === 'Crypto-conscious') {
        tokenName = this.state.tasks[i].token
        taskTitle = this.state.tasks[i].title
        tokenAmount = this.state.tasks[i].tokenAllocation
        badgeName = this.state.tasks[i].badge.name
        badgeLogoURL = this.state.tasks[i].badge.logoURL
        resourceURL = this.state.tasks[i].resourceURL
      }
    }
    return (
      <div
        align='center'
        className='ContractInteraction'>
        <div className='lander'>
          <h1>{taskTitle}</h1>
          <p>
          Let's verify you know the basics before getting into the crypto world.
          </p>
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
              <h2>
              Prove you are crypto-conscious by downloading the MyCrypto wallet and cryptographically signing a message!
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
                  width='45'
                  height='45'
                  src={badgeLogoURL}
                /><br />
              </Well>
            </Well>
          </div>
        </div>
        <div
          className='steps'>
          <h1
            className='stepHeader'>
            <strong>
              Step 1
            </strong>
          </h1>
          <p>
            Download the MyCrypto app by clicking <a href={resourceURL}>here</a> and following the instructions
          </p>
          <h1
            className='stepHeader'>
            <strong>
              Step 2
            </strong>
          </h1>
          <p>
            Sign the below message within the MyCrypto app
          </p>
        </div>
        <div>
          <br />
          <i>Already signed a message in the app? Paste your signed message code-block in the space below and verify it!</i>
        </div>
        <div
          align='left'
          className='messageInput'>
          <Form>
            <FormGroup>
              <Label
                for='exampleText'>
Verify Message
              </Label>
              <Input
                type='textarea'
                name='text'
                id='exampleText' />
            </FormGroup>
          </Form>
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
