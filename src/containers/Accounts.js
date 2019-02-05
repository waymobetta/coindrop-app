import React, { Component } from 'react'
import {
  Glyphicon,
  Collapse
} from 'react-bootstrap'
import { Button } from 'reactstrap'
import './Accounts.css'
import { Auth } from 'aws-amplify'
import Reddit from '../util/Reddit'
import StackOverflow from '../util/StackOverflow'

export default class Accounts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      redditUsername: '',
      stackOverflowUserID: '',
      isVerifyingReddit: false,
      isVerifyingStackOverflow: false,
      redditVerified: false,
      stackOverflowVerified: false,
      isRedditDropOpen: false,
      isStackOverflowDropOpen: false
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()

      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      this.setState({
        userID: currentUser.signInUserSession.accessToken.payload.username,
        token: jwt
      })

      const redditUserInfo = await Reddit.getUser(currentUser.signInUserSession.accessToken.payload.username, jwt)

      const stackUserInfo = await StackOverflow.getUser(currentUser.signInUserSession.accessToken.payload.username, jwt)

      if (redditUserInfo.status === true) {
        this.setState({
          redditUsername: redditUserInfo.message.info.reddit_data.username
        })
        if (redditUserInfo.message.info.reddit_data.verification_data.is_verified) {
          this.setState({
            redditVerified: true
          })
        }
      }

      if (stackUserInfo.status === true) {
        this.setState({
          stackOverflowUserID: stackUserInfo.message.info.id
        })
        if (stackUserInfo.message.info.stackoverflow_data.verification_data.is_verified) {
          this.setState({
            stackOverflowVerified: true
          })
        }
      }
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
  };

  async handleSubmit (event, account) {
    if (account === 'reddit') {
      this.setState({
        isVerifyingReddit: true
      })

      Reddit.generateVerificationCode(this.state.userID, this.state.redditUsername, this.state.token)

      this.props.history.push('/accounts/reddit')
    } else if (account === 'stackOverflow') {
      this.setState({
        isVerifyingStackOverflow: true
      })

      StackOverflow.generateVerificationCode(this.state.userID, Number(this.state.stackOverflowUserID), this.state.token)

      this.props.history.push('/accounts/stackoverflow')
    }
  }

  render () {
    return (
      <div className='Accounts'>
        <div className='lander'>
          <h1>accounts</h1>
          <div id='account'>
            <Button
              className='TaskButton'
              onClick={() => this.setState({ isRedditDropOpen: !this.state.isRedditDropOpen })}>
              {this.state.redditVerified
                ? <span role='img' description='aria-label'><span id='AccountSpan'>Reddit</span> <Glyphicon glyph='ok' /></span>
                : <span role='img' description='aria-label'><span id='AccountSpan'>Reddit</span> <Glyphicon glyph='remove' /></span>}
            </Button>
            <Collapse in={this.state.isRedditDropOpen}>
              <div align='center'>
                <nav className='navbar navbar-light bg-light'>
                  <form className='form-inline'>
                    <input
                      className='form-control mr-sm-2'
                      type='text'
                      id='redditUsername'
                      placeholder='coindrop_bob'
                      aria-label='Verify'
                      onChange={this.handleChange}
                    />
                    <Button
                      className='button--cd btn btn-outline-primary'
                      outline
                      color='primary'
                      type='submit'
                      onClick={event => {
                        this.handleSubmit(event, 'reddit')
                      }}
                      disabled={!this.validateRedditForm()}>
                      verify
                    </Button>
                  </form>
                </nav>
              </div>
            </Collapse>
          </div>
          <div>
            <Button
              className='TaskButton'
              onClick={() => this.setState({ isStackOverflowDropOpen: !this.state.isStackOverflowDropOpen })}>
              {this.state.stackOverflowVerified
                ? <span role='img' description='aria-label'><span id='AccountSpan'>Stack Overflow</span> <Glyphicon glyph='ok' /></span>
                : <span role='img' description='aria-label'><span id='AccountSpan'>Stack Overflow</span> <Glyphicon glyph='remove' /></span>}
            </Button>
            <Collapse in={this.state.isStackOverflowDropOpen}>
              <div align='center'>
                <nav className='navbar navbar-light bg-light'>
                  <form className='form-inline'>
                    <input
                      className='form-control mr-sm-2'
                      type='tel'
                      id='stackOverflowUserID'
                      placeholder='01234567890'
                      aria-label='verify'
                      onChange={this.handleChange}
                    />
                    <Button
                      className='button--cd btn btn-outline-primary'
                      outline
                      color='primary'
                      type='submit'
                      onClick={event => {
                        this.handleSubmit(event, 'stackOverflow')
                      }}
                      disabled={!this.validateStackOverflowForm()}>
                      verify
                    </Button>
                  </form>
                </nav>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    )
  }
}
