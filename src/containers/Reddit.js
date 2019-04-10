import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Button } from 'reactstrap'
import {
  Well,
  Glyphicon
} from 'react-bootstrap'
import RedditModule from '../util/Reddit'
import {
  getUserId
} from '../util/api'
import './Reddit.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default class Reddit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      token: '',
      verificationCode: '',
      codeCopied: false,
      isVerified: false
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()

      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      getUserId().then(async userID => {
        const redditUserInfo = await RedditModule.getVerificationState(userID, jwt)

        if (redditUserInfo.verified) {
          this.setState({
            isVerified: true
          })
        }
        this.setState({
          userID: userID,
          token: jwt,
          verificationCode: redditUserInfo.confirmedVerificationCode
        })
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
      const verificationResponse = await RedditModule.validateVerificationCode(this.state.userID, this.state.token)

      if (verificationResponse.verified === true) {
        this.setState({
          isVerified: true
        })
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  render () {
    return (
      <div
        align='center'
        className='Reddit'>
        <div className='lander'>
          <p className='badgeTitle'>
            Reddit
          </p>
          <p>verification code</p>
          <div
            className='CodeDiv'>
            <strong>code: </strong>{this.state.verificationCode}
            <div
              className='Divider' />
            <CopyToClipboard
              text={this.state.verificationCode}
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
          </div>
          <br />
          <div
            align='center'
            className='WellDiv'>
            <Well
              bsSize='small'>
              <h2>please paste this code in the <u>title</u> section of a new post <a href='https://www.reddit.com/r/testing_QA_adChain/submit' target='_blank' rel='noopener noreferrer'>here</a> at the coindrop subreddit
              </h2>
            </Well>
          </div>
          <div>
            <br />
            <i>already posted this code? click verify below to check </i>
          </div>
          <Button
            className='button--cd btn btn-outline-primary'
            outline
            color='primary'
            block
            onClick={event => this.handleClick(event)}
            disabled={this.validateClick()}>
verify
          </Button>
          <div>
            {this.state.isVerified
              ? <span role='img' description='aria-label'><span id='AccountSpanSuccess'>verified </span> <Glyphicon glyph='ok' /></span>
              : <span role='img' description='aria-label'><span id='AccountSpanFail'>not verified</span> <Glyphicon glyph='remove' /></span>}
          </div>
        </div>
      </div>
    )
  }
}
