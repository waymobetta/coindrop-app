import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel
} from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import './ChangeEmail.css'

export default class ChangeEmail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      code: '',
      email: '',
      codeSent: false,
      isConfirming: false,
      isSendingCode: false
    }
  }

  validateEmailForm () {
    return this.state.email.length > 0
  }

  validateConfirmForm () {
    return this.state.code.length > 0
  }

  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  async handleUpdateClick (event) {
    event.preventDefault()

    this.setState({
      isSendingCode: true
    })

    try {
      const currentUser = await Auth.currentAuthenticatedUser()

      await Auth.updateUserAttributes(
        currentUser,
        {
          email: this.state.email
        }
      )

      this.setState({
        codeSent: true
      })
    } catch (e) {
      console.error(e.message)
      this.setState({
        isSendingCode: false
      })
    }
  }

  async handleConfirmClick (event) {
    event.preventDefault()

    this.setState({
      isConfirming: true
    })

    try {
      await Auth.verifyCurrentUserAttributeSubmit(
        'email',
        this.state.code
      )

      this.props.history.push('/settings/emailsuccess')
    } catch (e) {
      console.error(e.message)
      this.setState({
        isConfirming: false
      })
    }
  }

  renderUpdateForm () {
    return (
      <form onSubmit={event => this.handleUpdateClick(event)}>
        <FormGroup
          bsSize='large'
          controlId='email'>
          <ControlLabel>new email</ControlLabel>
          <FormControl
            autoFocus
            type='email'
            value={this.state.email}
            placeholder='enter your new email here'
            onChange={event => this.handleChange(event)}
          />
        </FormGroup>
        <LoaderButton
          block
          className='button--cd btn btn-outline-primary'
          outline
          color='primary'
          type='submit'
          text='update email'
          loadingText='updating..'
          disabled={!this.validateEmailForm()}
          isLoading={this.state.isSendingCode}
        />
      </form>
    )
  }

  renderConfirmationForm () {
    return (
      <form onSubmit={this.handleConfirmClick}>
        <FormGroup
          bsSize='large'
          controlId='code'>
          <ControlLabel>confirmation code</ControlLabel>
          <FormControl
            autoFocus
            type='tel'
            value={this.state.code}
            onChange={event => this.handleChange(event)}
          />
          <HelpBlock>
please check your email ({this.state.email}) for the confirmation code.
          </HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          className='button--cd btn btn-outline-primary'
          outline
          color='primary'
          type='submit'
          text='confirm'
          loadingText='confirming..'
          disabled={!this.validateConfirmForm()}
          isLoading={this.state.isConfirming}
        />
      </form>
    )
  }

  render () {
    return (
      <div
        align='center'
        className='updateEmail'>
        <p
          className='badgeTitle'
          style={{ color: '#6b3eff', fontSize: '22pt' }}>
          Update Email
        </p>
        <div className='ChangeEmail'>
          <div>
            <p align='center'>If you'd like to change your email, this is the place to do it</p>
            <br />
          </div>
          {!this.state.codeSent
            ? this.renderUpdateForm()
            : this.renderConfirmationForm()}
        </div>
      </div>
    )
  }
}
