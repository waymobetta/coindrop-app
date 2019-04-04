import { baseURL } from './api'

const Reddit = {
  async getUser (userID, JwtToken) {
    return fetch(`${baseURL}social/reddit/${userID}`, {
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
  async addUser (userID, username, JwtToken) {
    const payload = {
      'userId': userID,
      'username': username
    }
    return fetch(`${baseURL}social/reddit`, {
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
    return fetch(`${baseURL}social/reddit/${userID}/verify`, {
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
    return fetch(`${baseURL}social/reddit/${userID}/verify`, {
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

export default Reddit
