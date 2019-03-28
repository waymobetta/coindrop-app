import React, { Component } from 'react'
import { Well } from 'react-bootstrap'
import './Projects.css'

export default class Projects extends Component {
  render () {
    return (
      <div className='Projcts'>
        <div className='lander'>
          <p
            className='badgeTitle'
            align='center'>
              Projects
          </p>
          <ol>
            <Well className='projectWell'>
              <div className='project'>
                <Well className='individualWell'>
                  <h1 className='titleDiv'>
                    adChain
                  </h1>
                  <img
                    className='projectLogo'
                    align='right'
                    src='https://user-images.githubusercontent.com/17755587/50762314-705eea00-1221-11e9-8a1e-0accf433e799.png'
                    alt='logo'
                    height='50'
                    width='55'
                  />
                  <br /><br />
                  <strong>dba: </strong> <a href='https://metax.io'>MetaX</a><br />
                  <strong>Token:</strong> <a href='https://coinmarketcap.com/currencies/adtoken/'>adToken (ADT)</a><br />
                  <strong>Website:</strong> <a href='https://adchain.com'>https://adchain.com</a><br />
                  <strong>Description: </strong>MetaX leverages Web 2.0 and blockchain technology to design real-world advertising solutions that diminish ad fraud and establish a transparent ecosystem.
                </Well>
              </div>
            </Well>
          </ol>
        </div>
      </div>
    )
  }
}
