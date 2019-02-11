import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './Login.css'
import LoaderButton from '../components/LoaderButton'
import { Auth } from 'aws-amplify'

export default class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    }
  }

  validateForm () {
    return this.state.email.length > 0 && this.state.password.length > 0
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
      await Auth.signIn(this.state.email, this.state.password)
      // this.props.userHasAuthenticated(true)
      // this.props.history.push('/profile')
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  render () {
    return (
      <div className='Login'>
        <form onSubmit={event => this.handleSubmit(event)}>
          <FormGroup controlId='email' bsSize='large'>
            <ControlLabel>email</ControlLabel>
            <FormControl
              autoFocus
              type='email'
              value={this.state.email}
              onChange={event => this.handleChange(event)}
            />
          </FormGroup>
          <FormGroup controlId='password' bsSize='large'>
            <ControlLabel>password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={event => this.handleChange(event)}
              type='password'
            />
          </FormGroup>
          <Link to='/login/reset'>forgot password?</Link><br />
          <Link to='/signup'>no account?</Link>
          <LoaderButton
            block
            className='button--cd btn btn-outline-primary'
            outline
            color='primary'
            disabled={!this.validateForm()}
            type='submit'
            isLoading={this.state.isLoading}
            text='log in'
            loadingText='logging in…'
          />
        </form>
      </div>
    )
  }
}
