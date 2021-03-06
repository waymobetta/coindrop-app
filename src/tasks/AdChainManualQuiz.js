import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import { Auth } from 'aws-amplify'
import './AdChainArchaeologist.css'
import Quiz from '../util/Quiz'

export default class AdChainArchaeologist extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '',
      token: '',
      isLoading: false,
      isQuizSubmitted: false,
      numberCorrect: 0,
      qOneAns: '',
      qTwoAns: '',
      qThreeAns: '',
      qFourAns: '',
      qFiveAns: ''
    }
  }

  async componentWillMount () {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      this.setState({
        userID: currentUser.signInUserSession.accessToken.payload.username,
        token: jwt
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()

    this.setState({ isLoading: true })

    // TODO:
    // fix passing in quiz title
    const quizObj = {
      title: 'archaeologist',
      userID: this.state.userID,
      qOneAns: this.state.qOneAns,
      qTwoAns: this.state.qTwoAns,
      qThreeAns: this.state.qThreeAns,
      qFourAns: this.state.qFourAns,
      qFiveAns: this.state.qFiveAns
    }

    try {
      // send quiz results to backend
      const postAnswerResponse = await Quiz.postAnswers(quizObj, this.state.token)

      if (postAnswerResponse.status === true) {
        this.setState({
          isQuizSubmitted: true
        })
      }

      const newQuizObj = {
        title: 'archaeologist',
        userID: this.state.userID
      }

      const quizResultsResponse = await Quiz.getResults(newQuizObj, this.state.token)

      let quizResultMessage

      switch (true) {
        case quizResultsResponse.message.questions_correct === 5:
          quizResultMessage = `Nice! You got ${quizResultsResponse.message.questions_correct} questions right!`
          break
        case quizResultsResponse.message.questions_correct === 4:
          quizResultMessage = `Not bad! You got ${quizResultsResponse.message.questions_correct} questions right!`
          break
        case quizResultsResponse.message.questions_correct === 3:
          quizResultMessage = `You did alright..you got ${quizResultsResponse.message.questions_correct} questions right`
          break
        case quizResultsResponse.message.questions_correct === 2:
          quizResultMessage = `You got ${quizResultsResponse.message.questions_correct} questions right...try a little harder next time`
          break
        case quizResultsResponse.message.questions_correct === 1:
          quizResultMessage = `Not good..you only got $(quizResultsResponse.message.questions_correct} question right`
          break
        default:
          quizResultMessage = `Ouch...you didn't get any questions right`
          break
      }

      // TODO:
      // upgrade alert to modal, etc.
      alert(quizResultMessage)

      this.props.history.push('/tasks/success')
    } catch (e) {
      console.error(e.message)
      this.setState({
        isLoading: false
      })
    }
  }

  validateForm () {
    return (
      this.state.qOneAns.length > 0 &&
      this.state.qTwoAns.length > 0 &&
      this.state.qThreeAns.length > 0 &&
      this.state.qFourAns.length > 0 &&
      this.state.qFiveAns > 0
    )
  }

  render () {
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
            Welcome to the archaeologist quiz. <br />Each correct question will reward token. Each incorrect question will not. <br />You only get 1 chance.<br /><br />Good luck!
        </div>
        <br />
        <div
          align='center'
          className='TaskBuilderForm'>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId='qOneAns'>
              <div
                align='left'>
                <ControlLabel>1. How many domains currently hold the status 'In Registry' in the adChain Publisher Registry?</ControlLabel>
              </div>
              <i>hint: filter out the noise..</i>
              <div
                className='InfoDescription'>
                answer format: number
              </div>
              <FormControl
                autoFocus
                type='text'
                placeholder='answer'
                onChange={this.handleChange}
                value={this.state.qOneAns}
              />
            </FormGroup>
            <br />
            <FormGroup controlId='qTwoAns'>
              <div
                align='left'>
                <ControlLabel>2. What is the name of the cryptocurrency used to curate the adChain Publisher Registry?</ControlLabel>
              </div>
              <i>hint: we had a token launch, not an ICO..</i>
              <div
                className='InfoDescription'>
                  answer format: lowercase
              </div>
              <FormControl
                type='text'
                placeholder='answer'
                onChange={this.handleChange}
                value={this.state.qTwoAns}
              />
            </FormGroup>
            <br />
            <FormGroup controlId='qThreeAns'>
              <div
                align='left'>
                <ControlLabel>3. And what is the contract address of this cryptocurrency?</ControlLabel>
              </div>
              <i>hint: maybe our friends at <a href='https://etherscan.io'>etherscan</a> can help..</i>
              <div
                className='InfoDescription'>
                answer format: 0x123456789
              </div>
              <FormControl
                type='text'
                placeholder='answer'
                onChange={this.handleChange}
                value={this.state.qThreeAns}
              />
            </FormGroup>
            <br />
            <FormGroup controlId='qFourAns'>
              <div
                align='left'>
                <ControlLabel>4. What date did the adChain Publisher Release Candidate go live on the Ethereum Mainnet?</ControlLabel>
              </div>
              <i>hint: reading is the perfect <a href='https://medium.com'>medium</a> for getting company updates..</i>
              <div
                className='InfoDescription'>
                answer format: 040612
              </div>
              <FormControl
                type='text'
                placeholder='answer'
                onChange={this.handleChange}
                value={this.state.qFourAns}
              />
            </FormGroup>
            <br />
            <FormGroup controlId='qFiveAns'>
              <div
                align='left'>
                <ControlLabel>5. According to the 'Claiming ADT Rewards Breakdown' located within the help section of the adChain Publisher Registry, how many ways are there to earn adToken rewards?</ControlLabel>
              </div>
              <i>hint: the path to the answer is in the question..</i>
              <div
                className='InfoDescription'>
                answer format: number
              </div>
              <FormControl
                type='text'
                placeholder='answer'
                onChange={this.handleChange}
                value={this.state.qFiveAns}
              />
            </FormGroup>
            <LoaderButton
              block
              className='button--cd btn btn-outline-primary'
              outline
              color='primary'
              type='submit'
              disabled={!this.validateForm()}
              text='send'
              isLoading={this.state.isLoading}
              loadingText='submitting task..'
            />
          </form>
        </div>
      </div>
    )
  }
}
