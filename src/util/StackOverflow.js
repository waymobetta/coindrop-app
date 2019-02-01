import { baseURL } from './api'

const StackOverflow = {
	async getUser(auth_user_id, jwt_token) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
			}
		}
		return fetch(`${baseURL}/getstackuser`, {
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
	async addUser(auth_user_id, jwt_token) {
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
		return fetch(`${baseURL}/addstackuser`, {
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
	async generateVerificationCode(auth_user_id, user_id, jwt_token) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id,
				"stackoverflow_data": {
					"user_id": user_id
				}
			}
		}
		return fetch(`${baseURL}/generatestackverificationcode`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Authorization": "Bearer " + jwt_token
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then( jsonResponse => {
			return jsonResponse;
		});
	},
	async validateVerificationCode(auth_user_id, jwt_token) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
			}
		}
		return fetch(`${baseURL}/validatestackverificationcode`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Authorization": "Bearer " + jwt_token
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then( jsonResponse => {
			return jsonResponse;
		});
	}
}

export default StackOverflow;
