import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import './AdChainQuiz.css'

export default class AdChainArchaeologist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      userName: '',
      wallet: '',
      token: ''
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      console.log(currentUser)

      this.setState({
        userID: currentUser.signInUserSession.accessToken.payload.username,
        userName: currentUser.attributes.email,
        wallet: "0x123",  // placeholder
        token: jwt
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  render () {
    const userName = this.state.userName
    const userNameShort = userName.split('@')[0]
    const userWallet = this.state.wallet
    const surveyUrl = `https://coindrop.typeform.com/to/mDDkkK?name=${userNameShort}&walletaddress=${userWallet}`

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
          className='typeform-widget'
          data-url={surveyUrl}
          data-transparency='50'
          data-hide-headers='true'
          data-hide-footer='true' />
        {
          (function () { var js; var q; var d = document; var gi = d.getElementById; var ce = d.createElement; var gt = d.getElementsByTagName; var id = 'typef_orm'; var b = 'https://embed.typeform.com/'; if (!gi.call(d, id)) { js = ce.call(d, 'script'); js.id = id; js.src = b + 'embed.js'; q = gt.call(d, 'script')[0]; q.parentNode.insertBefore(js, q) } })()
        }
      </div>
    )
  }
}
