import { baseURL } from './api'

const Quiz = {
  async getResults (quizID, JwtToken) {
    return fetch(`${baseURL}quizzes/${quizID}/results`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + JwtToken
      }
    }).then(res => {
      return res.json()
    }).then(jsonResponse => {
      return jsonResponse
    })
  }
}

export default Quiz
