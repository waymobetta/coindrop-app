import { baseURL } from './api'

const CoindropAuth = {
  async signUp (authUserId, JwtToken) {
    const payload = {
      'info': {
        'auth_user_id': authUserId
      }
    }
    return fetch(`${baseURL}/adduserid`, {
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
  async updateWallet (authUserId, walletAddress, JwtToken) {
    const payload = {
      'cognitoAuthUserID': authUserId,
      'walletAddress': walletAddress
    }
    return fetch(`${baseURL}/wallets`, {
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
  async getUserWallet (authUserId, JwtToken) {
    return fetch(`${baseURL}/wallets?userId=${authUserId}`, {
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
