import React, { Component } from 'react'
import Badge from './Badge'
import BadgesModule from '../util/Badges'
import { Auth } from 'aws-amplify'
import './Badges.css'

export default class Badges extends Component {
  constructor (props) {
    super(props)

    this.state = {
      badgeList: []
    }
  }

  async componentWillMount () {
    const currentUser = await Auth.currentAuthenticatedUser()
    const jwt = currentUser.signInUserSession.accessToken.jwtToken

    const badgesResponse = await BadgesModule.getBadges(jwt)

    console.log(badgesResponse)

    this.setState({
      badgeList: badgesResponse
    })
  }

  render () {
    return (
      <div className='Badges'>
        <div className='lander'>
          <h1>
        badges
          </h1>
          <div align='center'>
            {
              this.state.badgeList.map(badge => {
                return <Badge key={'Badge_' + badge.name} badge={badge} />
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
