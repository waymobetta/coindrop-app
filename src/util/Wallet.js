import { baseURL } from './api'

const Wallet = {
  async updateWallet (userID, walletAddress, walletType, JwtToken) {
    const payload = {
      'userID': userID,
      'walletAddress': walletAddress,
      'walletType': walletType
    }
    return fetch(`${baseURL}wallets`, {
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
  async verifyWallet (userID, verifyObj, taskID, JwtToken) {
    const payload = {
      'userID': userID,
      'taskID': taskID,
      'address': verifyObj.address,
      'message': verifyObj.msg,
      'signature': verifyObj.sig,
      'version': verifyObj.version
    }
    return fetch(`${baseURL}wallets/verify`, {
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
  async getUserWallets (JwtToken) {
    return fetch(`${baseURL}wallets`, {
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
