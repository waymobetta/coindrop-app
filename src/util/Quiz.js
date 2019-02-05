import { baseURL } from './api'

const Quiz = {
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
