import { baseURL } from './api'

const Tasks = {
  async getTasksForUser (userId, JwtToken) {
    const userTaskURL = `${baseURL}/tasks?userId=${userId}`

    return fetch(`${userTaskURL}`, {
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
