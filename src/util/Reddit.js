import { baseURL } from './api'

const Reddit = {
  async getUser (authUserId, JwtToken) {
    const payload = {
      'info': {
        'auth_user_id': authUserId
      }
    }
    return fetch(`${baseURL}/getreddituser`, {
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
        'reddit_data': {
          'username': '',
          'link_karma': 0,
          'comment_karma': 0,
          'trophies': [],
          'subreddits': []
        },
        'verification_data': {
          'posted_verification_code': '',
          'stored_verification_code': '',
          'isVerified': false
        }
      }
    }
    return fetch(`${baseURL}/addreddituser`, {
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
  async generateVerificationCode (authUserId, username, JwtToken) {
    const payload = {
      'info': {
        'auth_user_id': authUserId,
        'reddit_data': {
          'username': username
        }
      }
    }
    return fetch(`${baseURL}/generateredditverificationcode`, {
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
    return fetch(`${baseURL}/validateredditverificationcode`, {
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
