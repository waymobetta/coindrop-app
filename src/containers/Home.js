import React, { Component } from 'react'
import { ReactComponent as LogoFull } from '../components/assets/coindrop_logo_full.svg'
import './Home.css'

export default class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <div className='lander'>
          <LogoFull className='home__logo' height='75px' />
          <p>It Pays To Contribute</p>
        </div>
      </div>
    )
  }
}
