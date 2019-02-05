import React, { Component } from 'react'
import './Test.css'

export default class Quiz extends Component {
  constructor (props) {
    super(props)

    const quizData = [
      {
        question: 'What is the adChain Registry',
        answers: [
          'A Token-Curated Registry of the best Ad-Supported Websites',
          'A list of the best advertisements on the Internet',
          'A Registry of token holders and their account balances',
          'A platform to buy and sell digital advertisements with cryptocurrency'
        ],
        correct: 0
      },
      {
        question: 'What is the name of the cryptocurrency used to power the adChain Registry?',
        answers: [
          'DigiToken',
          'Basic Advertising Token',
          'adToken',
          'adCoin'
        ],
        correct: 2
      },
      {
        question: "What happens if a majority votes to support a website's application to the Registry?",
        answers: [
          'The website is rejected from the Registry',
          'The website is admitted into the Registry',
          'The website must apply again',
          'The website is kicked off the Internet '
        ],
        correct: 1
      },
      {
        question: 'What action can a member take if they think a website application is bad?',
        answers: [
          'Write a bad review',
          'Give a One-Star rating',
          'Nothing',
          'Challenge the website with adToken'
        ],
        correct: 3
      }
    ]

    this.state = {
      current: 0,
      quizData: quizData,
      correct: 0,
      incorrect: 0,
      isComplete: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (choice) {
    if (choice === this.state.quizData[this.state.current].correct) {
      this.setState({ correct: this.state.correct + 1 })
    } else {
      this.setState({ incorrect: this.state.incorrect + 1 })
    }

    if (this.state.current === this.state.quizData.length) {
      this.setState({
        isComplete: true
      })

      this.props.history.push('/tasks/success')
    } else {
      this.setState({
        current: this.state.current + 1
      })
    }
  }

  render () {
    return (
      <div
        align='center'>
        <ScoreArea correct={this.state.correct} incorrect={this.state.incorrect} />
        <QuizArea handleClick={this.handleClick} quizData={this.state.quizData[this.state.current]} />
      </div>
    )
  }
}

function Question (props) {
  var style = {
    color: 'red'
  }
  return (
    <div
      align='center'>
      <h1 style={style}>{props.quizData.question}</h1>
    </div>
  )
}

function Answer (props) {
  var style = {
    width: '100%',
    height: 100,
    color: 'blue'
  }
  return (
    <div
      align='center'>
      <button style={style} onClick={() => props.handleClick(props.choice)}>{props.answer}</button>
    </div>
  )
}

function AnswerList (props) {
  var answers = []
  for (let i = 0; i < props.quizData.answers.length; i++) {
    answers.push(<Answer key={'Answer_' + props.quizData.answers[i]} choice={i} handleClick={props.handleClick} answer={props.quizData.answers[i]} />)
  }
  return (
    <div
      align='center'>
      {answers}
    </div>
  )
}

function QuizArea (props) {
  var style = {
    width: '25%',
    display: 'block',
    boxSizing: 'border-box',
    padding: '0 2em'
  }
  return (
    <div
      align='center'
      style={style}>
      <Question quizData={props.quizData} />
      <AnswerList quizData={props.quizData} handleClick={props.handleClick} />
    </div>
  )
}

function TotalCorrect (props) {
  var style = {
    display: 'inline-block',
    padding: '1em',
    background: '#eee',
    margin: '0 1em 0 0'
  }
  return (
    <h2 style={style}>Correct: {props.correct}</h2>
  )
}

function TotalIncorrect (props) {
  var style = {
    display: 'inline-block',
    padding: '1em',
    background: '#eee',
    margin: '0 0 0 1em'
  }
  return (
    <h2 style={style}>Incorrect: {props.incorrect}</h2>
  )
}

function ScoreArea (props) {
  var style = {
    width: '100%',
    display: 'block',
    padding: '2em'
  }
  return (
    <div
      style={style}>
      <TotalCorrect correct={props.correct} />
      <TotalIncorrect incorrect={props.incorrect} />
    </div>
  )
}
