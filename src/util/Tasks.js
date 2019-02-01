import { baseURL } from './api'

const Tasks = {
	async getTasks(jwt_token) {
		return fetch(`${baseURL}/gettasks`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"Authorization": "Bearer " + jwt_token
			}
		}).then(res => {
			return res.json();
		}).then(jsonResponse => {
			return jsonResponse;
		});
	},
	async getTasksForUser(auth_user_id, jwt_token) {
		const payload = {
			"auth_user_id": auth_user_id
		}
		return fetch(`${baseURL}/getusertasks`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Authorization": "Bearer " + jwt_token
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then(jsonResponse => {
			return jsonResponse;
		});
	},
	// for company usage only
	async addTask(taskObj, jwt_token) {
		const payload = taskObj
		return fetch(`${baseURL}/addtask`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Authorization": "Bearer " + jwt_token
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then(jsonResponse => {
			return jsonResponse;
		});
	}
}

export default Tasks;
