import { baseURL } from './api'

const Tasks = {
  async getTasks (JwtToken) {
    return fetch(`${baseURL}/gettasks`, {
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
  async getTasksForUser (authUserId, JwtToken) {
    const payload = {
      'auth_user_id': authUserId
    }
    return fetch(`${baseURL}/getusertasks`, {
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
  // for company usage only
  async addTask (taskObj, JwtToken) {
    const payload = taskObj
    return fetch(`${baseURL}/addtask`, {
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

export default Tasks
