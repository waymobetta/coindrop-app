import { baseURL } from './api'

const Wallet = {
  async updateWallet (userID, walletAddress, walletType, JwtToken) {
    const payload = {
      'userID': userID,
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
  async getUserWallets (authUserId, JwtToken) {
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
