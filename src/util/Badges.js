import { baseURL } from './api'

const Badges = {
  async getBadgesForUser (userId, JwtToken) {
    const userBadgeURL = `${baseURL}badges/${userId}`
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
  async getBadges (JwtToken) {
    return fetch(`${baseURL}badges`, {
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
  // for company usage only
  async addBadge (badgeObj, JwtToken) {
    const payload = badgeObj
    return fetch(`${baseURL}addbadge`, {
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

export default Badges
