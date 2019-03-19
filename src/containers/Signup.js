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
// import { Auth } from 'aws-amplify'
// import CoindropAuth from '../util/CoindropAuth'
import { signupUser } from '../util/api'
// import Reddit from '../util/Reddit'
// import StackOverflow from '../util/StackOverflow'

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
      const newUser = signupUser(this.state.email, this.state.password)
      this.setState({
        newUser
      })
    } catch (e) {
      alert(e.message)
    }

    this.setState({ isLoading: false })
  }

  checkConfirmedLoop () {}

  renderConfirmationForm () {
    return (
      <HelpBlock>
        Please check your email for the confirmation link <br />
        If you've already verified, please click <a href='/login'>here</a> to log in.
      </HelpBlock>
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
