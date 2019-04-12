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
import {
  getUserId
} from '../util/api'
import './MyCryptoConscious.css'
import TasksModule from '../util/Tasks'
import WalletModule from '../util/Wallet'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default class MyCryptoConscious extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      verifyMessage: '',
      message: 'I <3 coindrop',
      isCompleted: false,
      codeCopied: false,
      isVerified: false,
      tasks: [],
      wallet: '',
      token: ''
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      getUserId().then(async userID => {
        const tasksResp = await TasksModule.getTasksForUser(userID, jwt)

        const walletsResponse = await WalletModule.getUserWallets(jwt)

        if (walletsResponse.wallets !== null) {
          for (let i = 0; i < walletsResponse.wallets.length; i++) {
            if (walletsResponse.wallets[i].walletType === 'eth') {
              this.setState({
                wallet: walletsResponse.wallets[i].address,
                isVerified: walletsResponse.wallets[i].verified
              })
            }
          }
        }

        this.setState({
          userID: userID,
          token: jwt,
          tasks: tasksResp.tasks
        })
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  async handleClick (event, taskID) {
    try {
      const verifyObj = JSON.parse(this.state.verifyMessage)

      if (verifyObj.address !== this.state.wallet) {
        alert('addresses do not match!')
        return
      }

      const validationResponse = await WalletModule.verifyWallet(this.state.userID, verifyObj, taskID, this.state.token)

      if (validationResponse.verified === true) {
        console.log('verified')
        this.setState({
          isVerified: true
        })
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  isJsonString (str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  validateForm () {
    if (!this.state.isVerified) {
      if (this.state.verifyMessage !== '' &&
        this.isJsonString(this.state.verifyMessage)
      ) {
        return false
      }
      return true
    }
    return true
  }

  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render () {
    let taskID
    let tokenName
    let taskTitle
    let tokenAmount
    let badgeName
    let badgeLogoURL
    let resourceURL

    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i].title === 'Crypto-conscious') {
        taskID = this.state.tasks[i].id
        tokenName = this.state.tasks[i].token
        taskTitle = this.state.tasks[i].title
        tokenAmount = this.state.tasks[i].tokenAllocation
        badgeName = this.state.tasks[i].badge.name
        badgeLogoURL = this.state.tasks[i].badge.logoURL
        resourceURL = this.state.tasks[i].resourceURL
      }
    }

    const verifySample = `{
      'address': '0xfedc485ab2c87529fb13414c57e391a98fd113ef',
      'msg': 'I <3 coindrop',
      'sig': '0x995f0b0cef348d3eb6c9fd6f3537dbe7e7906a1c498a5796a098f587e2a61380602874c36c24599f67ecfe4429d842f454f0362037c1758900ccef8aae805dee1b',
      'version': '2'
    }`

    return (
      <div
        align='center'
        className='ContractInteraction'>
        <div className='lander'>
          <p
            className='TaskTitle'
            style={{ color: '#6b3eff', 'fontSize': '18pt' }}>
            {taskTitle}
          </p>
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
            Download the MyCrypto app by clicking <a href={resourceURL}>here</a> and following the <a href='https://support.mycrypto.com/how-to/getting-started/how-to-sign-and-verify-messages-on-ethereum'>
              instructions</a>
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
        <div
          className='verificationMessage'>
          <Well
            className='verificationMessageWell'>
            {this.state.message}
            <div
              className='Divider' />
            <CopyToClipboard
              text={this.state.message}
              onCopy={() => this.setState({ codeCopied: true })}>
              <span
                role='img'
                description='aria-label'>
                <Glyphicon glyph='pushpin' />
              </span>
            </CopyToClipboard>
            {this.state.codeCopied
              ? <span style={{ color: 'green' }}>copied</span>
              : null}
          </Well>
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
                for='verifyMessage'>
Verify Message
              </Label>
              <Input
                className='inputClass'
                type='textarea'
                placeholder={verifySample}
                name='text'
                id='verifyMessage'
                value={this.state.verifyMessage}
                onChange={event => this.handleChange(event)}
              />
            </FormGroup>
          </Form>
        </div>
        <Button
          className='button--cd btn btn-outline-primary'
          outline
          color='primary'
          block
          onClick={event => this.handleClick(event, taskID)}
          disabled={this.validateForm()}>
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
