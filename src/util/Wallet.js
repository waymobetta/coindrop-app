import { baseURL } from './api'

const Wallet = {
  async updateWallet (walletAddress, walletType, JwtToken) {
    const payload = {
      'walletAddress': walletAddress,
      'walletType': walletType
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

export default Wallet
