import { baseURL } from './api'

const Transactions = {
  async getTransactionsForUser (userId, JwtToken) {
    const userBadgeURL = `${baseURL}transactions/${userId}`
    return fetch(`${userBadgeURL}`, {
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
  async getTransactions (JwtToken) {
    return fetch(`${baseURL}transactions`, {
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

export default Transactions
