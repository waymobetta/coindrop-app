import { baseURL } from './api'

const Reddit = {
	async getUser(auth_user_id, jwt_token) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
			}
		}
		return fetch(`${baseURL}/getreddituser`, {
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
				"reddit_data": {
					"username": "",
					"link_karma": 0,
					"comment_karma": 0,
					"trophies": [],
					"subreddits": [],
				},
				"verification_data": {
					"posted_verification_code": "",
					"stored_verification_code": "",
					"isVerified": false
				}
			}
		}
		return fetch(`${baseURL}/addreddituser`, {
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
	async generateVerificationCode(auth_user_id, username, jwt_token) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id,
				"reddit_data": {
					"username": username
				}
			}
		}
		return fetch(`${baseURL}/generateredditverificationcode`, {
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
		return fetch(`${baseURL}/validateredditverificationcode`, {
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

export default Reddit;
