const StackOverflow = {
	getUser(auth_user_id) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
			}
		}
		return fetch(`http://localhost:5000/api/v1/getstackuser`, {
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
	addUser(auth_user_id) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id,
				"stackoverflow_data": {
					"exchange_account_id": 0,
					"user_id": 0,
					"display_name": "",
					"accounts": [],
				},
				"verification_data": {
					"posted_verification_code": "",
					"stored_verification_code": "",
					"is_verified": false
				}
			}
		}
		return fetch(`http://localhost:5000/api/v1/addstackuser`, {
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
	generateVerificationCode(auth_user_id, user_id) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id,
				"stackoverflow_data": {
					"user_id": user_id
				}
			}
		}
		return fetch(`http://localhost:5000/api/v1/generatestackverificationcode`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then( jsonResponse => {
			console.log(jsonResponse);
			return jsonResponse;
		});
	},
	validateVerificationCode(auth_user_id) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
			}
		}
		return fetch(`http://localhost:5000/api/v1/validatestackverificationcode`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then( jsonResponse => {
			console.log(jsonResponse);
			return jsonResponse;
		});
	}
}

export default StackOverflow;
