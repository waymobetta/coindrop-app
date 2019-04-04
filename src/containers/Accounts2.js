import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import './Accounts.css'
import { Auth } from 'aws-amplify'
import RedditModule from '../util/Reddit'
import {
  getUserId
} from '../util/api'
import StackOverflowModule from '../util/StackOverflow'

export default class Accounts2 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      token: '',
      redditUsername: '',
      stackOverflowUserID: '',
      redditVerified: false,
      stackOverflowVerified: false,
      isRedditSubmitted: false,
      isStackOverflowSubmitted: false,
      isRedditDropOpen: false,
      isStackOverflowDropOpen: false
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()

      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      getUserId().then(async userID => {
        this.setState({ userID: userID })
        const redditUserInfo = await RedditModule.getVerificationState(userID, jwt)

        const stackUserInfo = await StackOverflowModule.getVerificationState(userID, jwt)

        if (redditUserInfo.verified) {
          this.setState({
            redditVerified: true
          })
        }

        if (stackUserInfo.verified) {
          this.setState({
            stackOverflowVerified: true
          })
        }
      })

      this.setState({
        token: jwt
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  validateRedditForm () {
    return !this.state.redditVerified
  }

  validateStackOverflowForm () {
    return !this.state.stackOverflowVerified
  }

  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  async handleSubmit (event, account) {
    event.preventDefault()

    if (account === 'reddit') {
      try {
        await RedditModule.addUser(this.state.userID, this.state.redditUsername, this.state.token)
        this.setState({
          isRedditSubmitted: true
        })
        this.props.history.push('/accounts/reddit')
      } catch (e) {
        console.error(e.message)
      }
    } else if (account === 'stackOverflow') {
      try {
        await StackOverflowModule.addUser(this.state.userID, this.state.stackOverflowUserID, this.state.token)
        this.setState({
          isStackOverflowSubmitted: true
        })
        this.props.history.push('/accounts/stackoverflow')
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  render () {
    return (
      <div
        align='center'
        className='Wallets'>
        <div className='lander'>
          <p
            className='badgeTitle'
            style={{ color: '#6b3eff', fontSize: '22pt' }}>
          Accounts
          </p>
          <br />
          <div className='WalletsForm'>
            <form onSubmit={event => this.handleSubmit(event, 'reddit')}>
              <FormGroup controlId='redditUsername'>
                <ControlLabel>Reddit</ControlLabel>
                <FormControl
                  autoFocus
                  type='text'
                  placeholder='crypto_wizard'
                  disabled={!this.validateRedditForm()}
                  value={this.state.redditUsername}
                  onChange={event => this.handleChange(event)}
                />
                <LoaderButton
                  block
                  className='button--cd btn btn-outline-primary'
                  outline
                  color='primary'
                  type='submit'
                  disabled={!this.validateRedditForm()}
                  isLoading={this.state.isRedditSubmitted}
                  text='submit'
                  loadingText='adding account..'
                />
              </FormGroup>
            </form>
            <form onSubmit={event => this.handleSubmit(event, 'stackOverflow')}>
              <FormGroup controlId='stackOverflowUserID'>
                <ControlLabel>Stack Overflow</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='01234567890'
                  disabled={!this.validateStackOverflowForm()}
                  value={this.state.stackOverflowUserID}
                  onChange={event => this.handleChange(event)}
                />
                <LoaderButton
                  block
                  className='button--cd btn btn-outline-primary'
                  outline
                  color='primary'
                  type='submit'
                  disabled={!this.validateStackOverflowForm()}
                  isLoading={this.state.isStackOverflowSubmitted}
                  text='submit'
                  loadingText='adding account..'
                />
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
