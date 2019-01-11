const Tasks = {
	async getTasks() {
		return fetch(`http://localhost:5000/api/v1/gettasks`, {
			method: "GET",
			headers: {
				"Content-type": "application/json"
			}
		}).then(res => {
			return res.json();
		}).then(jsonResponse => {
			return jsonResponse;
		});
	},
	async getTasksForUser(auth_user_id) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id		
			}
		}
		return fetch(`http://localhost:5000/api/v1/getusertasks`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then(jsonResponse => {
			return jsonResponse;
		});
	},
	// for company usage only
	addTask(auth_user_id, taskObj) {
		// sample task object	
		const sampleObj = {
			"title": "test title",
			"type": "action",
			"author": "test company",
			"description": "test test test",
			"token": "test token",
			"token_allocation": 1000,
			"badge_data": {
				"name": "test badge"
			}
		}
		const payload = taskObj
		return fetch(`http://localhost:5000/api/v1/addtask`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
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
