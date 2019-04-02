import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import './AdChainArchaeologist.css'
import LoaderButton from '../components/LoaderButton'
import QuizModule from '../util/Quiz'
import {
  getUserId
} from '../util/api'
import * as typeformEmbed from '@typeform/embed'

export default class AdChainArchaeologist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      userName: '',
      quizTaken: false,
      token: ''
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      getUserId().then(userID => {
        this.setState({
          userID: userID
        })
      })

      // TODO:
      // fetch resource ID other ways
      let taskResourceID = 'e1d49fb1-2fd9-48ba-b17d-3831b882373a'

      const quizResultResponse = await QuizModule.getResults(taskResourceID, jwt)

      let quizTaken = false

      if (quizResultResponse.code !== 500) {
        quizTaken = true
      }

      this.setState({
        token: jwt,
        quizTaken: quizTaken
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  launchTypeformPopUp (event) {
    try {
      const surveyUrl = `https://coindrop.typeform.com/to/mDDkkK?user_id=${this.state.userID}`
      const reference = typeformEmbed.makePopup(
        surveyUrl, {
          mode: 'popup',
          hideHeaders: true,
          hideFooter: true,
          onSubmit: () => {
            alert('ADT [token] incoming!!') // placeholder
            this.setState({ quizTaken: true })
          }
        })
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
        <p
          className='TaskTitle'
          style={{ color: '#6b3eff', 'fontSize': '18pt' }}>
          Archaeologist
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
            disabled={this.state.quizTaken}
            text="let's go!"
          />
        </div>
      </div>
    )
  }
}
