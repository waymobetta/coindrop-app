import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import './AdChainArchaeologist.css'
import WalletModule from '../util/Wallet'
import LoaderButton from '../components/LoaderButton'
import * as typeformEmbed from '@typeform/embed'

export default class AdChainArchaeologist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      userName: '',
      wallet: '',
      isCompleted: false,
      token: ''
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      const walletsResponse = await WalletModule.getUserWallets(jwt)

      for (let i = 0; i < walletsResponse.wallets.length; i++) {
        if (walletsResponse.wallets[i].walletType === 'eth') {
          this.setState({ wallet: walletsResponse.wallets[i].address })
        }
      }

      this.setState({
        userID: currentUser.signInUserSession.accessToken.payload.username,
        userName: currentUser.attributes.email,
        token: jwt
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  launchTypeformPopUp (event) {
    try {
      const userName = this.state.userName
      const userNameShort = userName.split('@')[0]
      const surveyUrl = `https://coindrop.typeform.com/to/mDDkkK?name=${userNameShort}`
      const reference = typeformEmbed.makePopup(
        surveyUrl, {
          mode: 'popup',
          hideHeaders: true,
          hideFooter: true,
          onSubmit: () => alert('ADT [token] incoming!!') // placeholder
        }
      )
      reference.open()
    } catch (err) {
      console.error(err.message)
    }
  }

  render () {
    return (
      <div
        align='center'
        className='TaskAuthor'>
        <h1>adChain</h1>
        <p
          className='TaskTitle'>
          archaeologist
        </p>
        <br />
        <div
          className='InfoDescription'>
            Welcome to the archaeologist quiz! <br />Each correct question will reward token. Each incorrect question will not. <br />You only get 1 chance.<br /><br />Good luck!
        </div>
        <br />
        <iframe
          title='adChainVideo'
          width='750'
          height='315'
          src='https://www.youtube-nocookie.com/embed/iQD92lCxbM8'
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen />
        <div
          className='typeform'>
          <LoaderButton
            block
            className='button--cd btn btn-outline-primary'
            outline
            color='primary'
            onClick={event => this.launchTypeformPopUp(event)}
            type='submit'
            disabled={this.state.isCompleted}
            text="let's go!"
          />
        </div>
      </div>
    )
  }
}
