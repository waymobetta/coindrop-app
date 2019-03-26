import { baseURL } from './api'

const StackOverflow = {
  async getUser (userID, JwtToken) {
    return fetch(`${baseURL}/social/stackoverflow/${userID}`, {
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
  async addUser (userID, stackUserID, JwtToken) {
    const payload = {
      'stackUserId': Number(stackUserID),
      'userId': userID
    }
    return fetch(`${baseURL}/social/stackoverflow`, {
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
  async getVerificationState (userID, JwtToken) {
    return fetch(`${baseURL}/social/stackoverflow/${userID}/verify`, {
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
  async validateVerificationCode (userID, JwtToken) {
    const payload = {
      'userId': userID
    }
    return fetch(`${baseURL}/social/stackoverflow/${userID}/verify`, {
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

export default StackOverflow
