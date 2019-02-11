import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import './Signup.css'
import { Auth } from 'aws-amplify'
import CoindropAuth from '../util/CoindropAuth'
import Reddit from '../util/Reddit'
import StackOverflow from '../util/StackOverflow'

export default class Signup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null
    }
  }

  validateForm () {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    )
  }

  validateConfirmationForm () {
    return this.state.confirmationCode.length > 0
  }

  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      })
      this.setState({
        newUser
      })
    } catch (e) {
      alert(e.message)
    }

    this.setState({ isLoading: false })
  }

  async handleConfirmationSubmit (event) {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
      await Auth.signIn(this.state.email, this.state.password)

      const currentUser = await Auth.currentAuthenticatedUser()

      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      // TODO:
      // refactor this block

      /// ////////////////////////////////

      try {
        setTimeout(async () => {
          const addCoindropUserResponse = await CoindropAuth.signUp(currentUser.username, jwt)
          if (addCoindropUserResponse.message !== 'success') {
            console.error(addCoindropUserResponse.message)
          }
        }, 500)
      } catch (e) {
        console.error(e.message)
      }

      try {
        setTimeout(async () => {
          const addRedditUserResponse = await Reddit.addUser(currentUser.username, jwt)
          if (addRedditUserResponse.message !== 'success') {
            console.error(addRedditUserResponse.message)
          }
        }, 500)
      } catch (e) {
        console.error(e.message)
      }

      try {
        setTimeout(async () => {
          const addStackUserResponse = await StackOverflow.addUser(currentUser.username, jwt)
          if (addStackUserResponse.message !== 'success') {
            console.error(addStackUserResponse.message)
          }
        }, 500)
      } catch (e) {
        console.error(e.message)
      }

      /// ////////////////////////////////

      // this.props.userHasAuthenticated(true)
      // this.props.history.push('/profile')
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  renderConfirmationForm () {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId='confirmationCode'>
          <ControlLabel>confirmation code</ControlLabel>
          <FormControl
            autoFocus
            type='tel'
            value={this.state.confirmationCode}
            onChange={event => this.handleChange(event)}
          />
          <HelpBlock>please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          className='button--cd btn btn-outline-primary'
          outline
          color='primary'
          disabled={!this.validateConfirmationForm()}
          type='submit'
          isLoading={this.state.isLoading}
          text='verify'
          loadingText='verifying…'
        />
      </form>
    )
  }

  renderForm () {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <FormGroup controlId='email'>
          <ControlLabel>email</ControlLabel>
          <FormControl
            autoFocus
            type='email'
            value={this.state.email}
            onChange={event => this.handleChange(event)}
          />
        </FormGroup>
        <FormGroup controlId='password'>
          <ControlLabel>password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={event => this.handleChange(event)}
            type='password'
          />
        </FormGroup>
        <FormGroup controlId='confirmPassword'>
          <ControlLabel>confirm password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={event => this.handleChange(event)}
            type='password'
          />
        </FormGroup>
        <Link to='/login'>already signed up?</Link><br />
        <LoaderButton
          block
          className='button--cd btn btn-outline-primary'
          outline
          color='primary'
          disabled={!this.validateForm()}
          type='submit'
          isLoading={this.state.isLoading}
          text='sign up'
          loadingText='signing up…'
        />
      </form>
    )
  }

  render () {
    return (
      <div className='Signup'>
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    )
  }
}
