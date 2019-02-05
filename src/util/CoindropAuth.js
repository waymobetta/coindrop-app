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
      'info': {
        'auth_user_id': authUserId,
        'wallet_address': walletAddress
      }
    }
    return fetch(`${baseURL}/updatewallet`, {
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
    const payload = {
      'info': {
        'auth_user_id': authUserId
      }
    }
    return fetch(`${baseURL}/getwallet`, {
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

export default CoindropAuth
