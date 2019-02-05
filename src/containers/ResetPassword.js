import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Link } from 'react-router-dom'
import {
  HelpBlock,
  FormGroup,
  Glyphicon,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import './ResetPassword.css'

export default class ResetPassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      code: '',
      email: '',
      password: '',
      codeSent: false,
      confirmed: false,
      confirmPassword: '',
      isConfirming: false,
      isSendingCode: false
    }
  }

  validateCodeForm () {
    return this.state.email.length > 0
  }

  validateResetForm () {
    return (
      this.state.code.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    )
  }

  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  };

  async handleSendCodeClick (event) {
    event.preventDefault()

    this.setState({ isSendingCode: true })

    try {
      await Auth.forgotPassword(this.state.email)
      this.setState({ codeSent: true })
    } catch (e) {
      alert(e.message)
      this.setState({ isSendingCode: false })
    }
  };

  async handleConfirmClick (event) {
    event.preventDefault()

    this.setState({ isConfirming: true })

    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.code,
        this.state.password
      )
      this.setState({ confirmed: true })
    } catch (e) {
      alert(e.message)
      this.setState({ isConfirming: false })
    }
  };

  renderRequestCodeForm () {
    return (
      <form onSubmit={this.handleSendCodeClick}>
        <FormGroup
          controlId='email'>
          <ControlLabel>email</ControlLabel>
          <FormControl
            autoFocus
            type='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          className='button--cd btn btn-outline-primary'
          outline
          color='primary'
          type='submit'
          loadingText='sending…'
          text='send confirmation'
          isLoading={this.state.isSendingCode}
          disabled={!this.validateCodeForm()}
        />
      </form>
    )
  }

  renderConfirmationForm () {
    return (
      <form onSubmit={this.handleConfirmClick}>
        <FormGroup
          controlId='code'>
          <ControlLabel>confirmation code</ControlLabel>
          <FormControl
            autoFocus
            type='tel'
            value={this.state.code}
            onChange={this.handleChange}
          />
          <HelpBlock>
            please check your email ({this.state.email}) for the confirmation
            code.
          </HelpBlock>
        </FormGroup>
        <hr />
        <FormGroup
          controlId='password'>
          <ControlLabel>new password</ControlLabel>
          <FormControl
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup
          controlId='confirmPassword'>
          <ControlLabel>confirm password</ControlLabel>
          <FormControl
            type='password'
            onChange={this.handleChange}
            value={this.state.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          className='button--cd btn btn-outline-primary'
          outline
          color='primary'
          type='submit'
          text='confirm'
          loadingText='confirming…'
          isLoading={this.state.isConfirming}
          disabled={!this.validateResetForm()}
        />
      </form>
    )
  }

  renderSuccessMessage () {
    return (
      <div className='success'>
        <Glyphicon glyph='ok' />
        <p>your password has been reset.</p>
        <p>
          <Link to='/login'>
            click here to login with your new credentials.
          </Link>
        </p>
      </div>
    )
  }

  render () {
    return (
      <div className='ResetPassword'>
        {!this.state.codeSent
          ? this.renderRequestCodeForm()
          : !this.state.confirmed
            ? this.renderConfirmationForm()
            : this.renderSuccessMessage()}
      </div>
    )
  }
}
