import React, { Component } from 'react'
import Badge from './Badge'
import { BadgeList } from './BadgeList'
import { Auth } from 'aws-amplify'
import CoindropAuth from '../util/CoindropAuth'
import './Profile.css'
import Emoji from '../util/Emoji'

export default class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      wallet: '',
      profilePhotoURL: '',
      badgeList: []
    }
  }

  componentWillMount () {
    this.setState({
      badgeList: BadgeList
    })
  }

  async componentDidMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()

      const userID = currentUser.signInUserSession.accessToken.payload.username

      const userEmail = currentUser.attributes.email
      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      const walletResponse = await CoindropAuth.getUserWallet(userID, jwt)

      if (walletResponse.status === false) {
        walletResponse.message = '0x0'
      }

      const emojiURL = Emoji.fetchRandomEmoji()

      this.setState({
        email: userEmail,
        username: userID,
        wallet: walletResponse.message,
        profilePhotoURL: emojiURL
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  render () {
    return (
      <div className='Profile'>
        <div className='lander'>
          <div align='center'>
            <h1>profile</h1>
            <img alt='' src={this.state.profilePhotoURL} height='60' width='75' />
            <p style={{ color: '#999' }}><i>{this.state.email}</i></p>
            <p>&nbsp;</p>
            <strong>ethereum: </strong>
            <a href={'https://etherscan.io/address/' + this.state.wallet}>
              {this.state.wallet}
            </a>
          </div>
          <hr />
          <p>badges</p>
          <div align='center'>
            <div className='row'>
              {
                this.state.badgeList.map(badge => {
                  return <Badge key={'Badge_' + badge.name} badge={badge} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
