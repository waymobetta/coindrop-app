import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import { Auth } from 'aws-amplify'
import Wallet from '../util/Wallet'
import './Wallets.css'

export default class Wallets extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      token: '',
      walletAddress: '',
      walletType: ''
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

  async handleSubmit (event, walletType) {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      const resp = await Wallet.updateWallet(this.state.walletAddress, walletType, this.state.token)
      if (resp.walletAddress) {
        this.setState({
          isWalletSubmitted: true
        })

        this.props.history.push('/settings/wallets/success')
      } else if (resp.status !== 200) {
        throw new Error(resp.detail)
      }
    } catch (e) {
      alert(e.message)
      this.setState({
        isLoading: false
      })
    }
  }

  // TODO:
  // fix hard coding of walletType (lines: 89, 107)

  render () {
    return (
      <div
        align='center'
        className='Wallets'>
        <div className='lander'>
          <h1>
            Wallets
          </h1>
          <br />
          <div className='WalletsForm'>
            <form onSubmit={event => this.handleSubmit(event, 'ethereum')}>
              <FormGroup controlId='ethWalletAddress'>
                <ControlLabel>Ethereum</ControlLabel>
                <FormControl
                  autoFocus
                  type='text'
                  placeholder='my ethereum wallet address'
                  value={this.state.ethWalletAddress}
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup controlId='btcWalletAddress'>
                <ControlLabel>Bitcoin</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='my bitcoin wallet address'
                  disabled
                  value={this.state.btcWalletAddress}
                  onChange={event => this.handleChange(event, 'bitcoin')}
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
