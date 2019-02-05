import { baseURL } from './api'

const Quiz = {
  async postAnswers (quizObj, JwtToken) {
    const payload = {
      'title': quizObj.title,
      'auth_user_id': quizObj.userID,
      'quiz_info': {
        'quiz_data': [
          {
            'question': '',
            'answer': quizObj.qOneAns
          },
          {
            'question': '',
            'answer': quizObj.qTwoAns
          },
          {
            'question': '',
            'answer': quizObj.qThreeAns
          },
          {
            'question': '',
            'answer': quizObj.qFourAns
          },
          {
            'question': '',
            'answer': quizObj.qFiveAns
          }
        ]
      }
    }
    return fetch(`${baseURL}/postresults`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + JwtToken
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json()
    }).then(jsonResponse => {
      return jsonResponse
    })
  },
  async getResults (newQuizObj, JwtToken) {
    const payload = {
      'title': newQuizObj.title,
      'auth_user_id': newQuizObj.userID
    }
    return fetch(`${baseURL}/getresults`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + JwtToken
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json()
    }).then(jsonResponse => {
      return jsonResponse
    })
  }
}

export default Quiz
