import React, { Component } from 'react'
import Badge from './Badge'
import Transaction from './Transaction'
import { Auth } from 'aws-amplify'
import {
  getUserId
} from '../util/api'
import WalletModule from '../util/Wallet'
import BadgesModule from '../util/Badges'
import TransactionModule from '../util/Transaction'
import './Profile.css'
import Emoji from '../util/Emoji'

export default class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      email: '',
      wallet: [],
      profilePhotoURL: '',
      badgeList: [],
      transactionList: []
    }
  }

  async componentDidMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()

      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      getUserId().then(async userID => {
        const badgesResponse = await BadgesModule.getBadgesForUser(userID, jwt)
        if (badgesResponse.badges !== null) {
          this.setState({
            badgeList: badgesResponse.badges
          })
        }

        const transactionResponse = await TransactionModule.getTransactionsForUser(userID, jwt)

        if (transactionResponse.transactions !== null) {
          this.setState({ transactionList: transactionResponse.transactions })
        }
        this.setState({ userID: userID })
      })

      const userEmail = currentUser.attributes.email

      const walletsResponse = await WalletModule.getUserWallets(jwt)

      if (walletsResponse.wallets !== null) {
        for (let i = 0; i < walletsResponse.wallets.length; i++) {
          if (walletsResponse.wallets[i].walletType === 'eth') {
            this.setState({ wallet: walletsResponse.wallets[i].address })
          }
        }
      }
      const emojiURL = Emoji.fetchRandomEmoji()

      this.setState({
        email: userEmail,
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
            <p className='badgeTitle'>
              Profile
            </p>
            <img alt='' src={this.state.profilePhotoURL} height='60' width='75' />
            <p style={{ color: '#999' }}><i>{this.state.email}</i></p>
            <p>&nbsp;</p>
            <strong>Ethereum: </strong>
            <a href={'https://etherscan.io/address/' + this.state.wallet}>
              {this.state.wallet}
            </a>
          </div>
          <hr />
          <p className='badgeTitle'>
            Transactions
          </p>
          {
            this.state.transactionList.map(transaction => {
              return <Transaction key={'Transaction_' + transaction.id} transaction={transaction} />
            })
          }
          <hr />
          <p className='badgeTitle'>
            Badges
          </p>
          <div align='center'>
            <div className='badgeDiv'>
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
