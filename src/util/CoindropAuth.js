import { baseURL } from './api'

const CoindropAuth = {
  async signUp (authUserId, JwtToken) {
    const payload = {
      'cognitoAuthUserId': authUserId
    }
    return fetch(`${baseURL}users`, {
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
  async getUserIdByCognitoId (authUserId, JwtToken) {
    return fetch(`${baseURL}users?cognitoAuthUserId=${authUserId}`, {
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
  async getUserById (userId, JwtToken) {
    return fetch(`${baseURL}users/${userId}`, {
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

export default CoindropAuth
