import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import {
  getUserId
} from '../util/api'
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
      ethWalletAddress: '',
      btcWalletAddress: '',
      isWalletSubmitted: false
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()

      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      getUserId().then(userID => {
        this.setState({
          userID: userID
        })
      })

      this.setState({
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

    let address

    if (walletType === 'btc') {
      address = this.state.btcWalletAddress
    } else if (walletType === 'eth') {
      address = this.state.ethWalletAddress
    }

    try {
      await Wallet.updateWallet(this.state.userID, address, walletType, this.state.token)
      this.setState({
        isWalletSubmitted: true
      })
      this.props.history.push('/settings/wallets/success')
    } catch (e) {
      alert(e.message)
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
          <p
            className='badgeTitle'
            style={{ color: '#6b3eff', fontSize: '22pt' }}>
            Wallets
          </p>
          <br />
          <div className='WalletsForm'>
            <form onSubmit={event => this.handleSubmit(event, 'eth')}>
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
                  onChange={event => this.handleChange(event, 'btc')}
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
