import { baseURL } from './api'

const Quiz = {
  async getResults (quizID, JwtToken) {
    return fetch(`${baseURL}/quizzes/${quizID}/results`, {
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
  },
  async getQuizForTask (taskID, JwtToken) {
    return fetch(`${baseURL}/quizzes/{`)
  }
}

export default Quiz
