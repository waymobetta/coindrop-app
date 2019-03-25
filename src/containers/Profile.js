import React, { Component } from 'react'
import Badge from './Badge'
import { BadgeList } from './BadgeList'
import { Auth } from 'aws-amplify'
import { getWallets } from '../util/api'
import './Profile.css'
import Emoji from '../util/Emoji'

export default class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      wallet: [],
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

      const walletsResponse = await getWallets()

      const emojiURL = Emoji.fetchRandomEmoji()

      for (let i = 0; i < walletsResponse.wallets.length; i++) {
        if (walletsResponse.wallets[i].walletType === 'eth') {
          this.setState({ wallet: walletsResponse.wallets[i].address })
        }
      }

      this.setState({
        email: userEmail,
        username: userID,
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
            <strong>Ethereum: </strong>
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
