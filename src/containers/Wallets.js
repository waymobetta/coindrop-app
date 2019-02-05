import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import { Auth } from 'aws-amplify'
import CoindropAuth from '../util/CoindropAuth'
import './Wallets.css'

export default class Wallets extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      token: '',
      ethWalletAddress: '',
      btcWalletAddress: ''
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
    } catch (e) {
      console.error(e.message)
    }
  }

  validateForm () {
    return (
      this.state.ethWalletAddress.length > 0
    )
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
      await CoindropAuth.updateWallet(this.state.userID, this.state.ethWalletAddress, this.state.token)

      this.setState({
        isWalletSubmitted: true
      })

      this.props.history.push('/settings/wallets/success')
    } catch (e) {
      alert(e.message)
      this.setState({
        isLoading: false
      })
    }
  }

  render () {
    return (
      <div
        align='center'
        className='Wallets'>
        <div className='lander'>
          <h1>
            wallets
          </h1>
          <br />
          <div className='WalletsForm'>
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId='ethWalletAddress'>
                <ControlLabel>ethereum wallet address</ControlLabel>
                <FormControl
                  autoFocus
                  type='text'
                  placeholder='my ethereum wallet address'
                  value={this.state.ethWalletAddress}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId='btcWalletAddress'>
                <ControlLabel>bitcoin wallet address</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='my bitcoin wallet address'
                  disabled
                  value={this.state.btcWalletAddress}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <LoaderButton
                block
                className='button--cd btn btn-outline-primary'
                outline
                color='primary'
                type='submit'
                disabled={!this.validateForm()}
                isLoading={this.state.isWalletSubmitted}
                text='submit'
                loadingText='updating wallet..'
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
