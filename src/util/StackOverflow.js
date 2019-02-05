import { baseURL } from './api'

const StackOverflow = {
  async getUser (authUserId, JwtToken) {
    const payload = {
      'info': {
        'auth_user_id': authUserId
      }
    }
    return fetch(`${baseURL}/getstackuser`, {
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
  async addUser (authUserId, JwtToken) {
    const payload = {
      'info': {
        'auth_user_id': authUserId,
        'stackoverflow_data': {
          'exchange_account_id': 0,
          'user_id': 0,
          'display_name': '',
          'accounts': []
        },
        'verification_data': {
          'posted_verification_code': '',
          'stored_verification_code': '',
          'is_verified': false
        }
      }
    }
    return fetch(`${baseURL}/addstackuser`, {
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
  async generateVerificationCode (authUserId, userId, JwtToken) {
    const payload = {
      'info': {
        'auth_user_id': authUserId,
        'stackoverflow_data': {
          'user_id': userId
        }
      }
    }
    return fetch(`${baseURL}/generatestackverificationcode`, {
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
  async validateVerificationCode (authUserId, JwtToken) {
    const payload = {
      'info': {
        'auth_user_id': authUserId
      }
    }
    return fetch(`${baseURL}/validatestackverificationcode`, {
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
