import React, { Component } from 'react'
import Badge from './Badge'
import { BadgeList } from './BadgeList'
import './Badges.css'

export default class Badges extends Component {
  constructor (props) {
    super(props)

    this.state = {
      badgeList: []
    }
  }

  componentWillMount () {
    this.setState({
      badgeList: BadgeList
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
