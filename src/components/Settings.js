import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import LoaderButton from './LoaderButton'
import './Settings.css'

export default class Settings extends Component {
  render () {
    return (
      <div className='Settings'>
        <p
          className='badgeTitle'
          align='center'>
          Settings
        </p>
        <p className='buttonSettings'>
          <LinkContainer to='/settings/wallets'>
            <LoaderButton
              className='button--cd btn btn-outline-primary'
              block
              outline
              color='primary'
              text='update wallets'
            />
          </LinkContainer>
          <LinkContainer to='/settings/email'>
            <LoaderButton
              className='button--cd btn btn-outline-primary'
              block
              outline
              color='primary'
              text='update email'
            />
          </LinkContainer>
          <LinkContainer to='/settings/password'>
            <LoaderButton
              className='button--cd btn btn-outline-primary'
              block
              outline
              color='primary'
              text='update password'
            />
          </LinkContainer>
        </p>
      </div>
    )
  }
}
