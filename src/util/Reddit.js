const Reddit = {
	getUser(auth_user_id) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
			}
		}
		return fetch(`http://localhost:5000/api/v1/getreddituser`, {
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
	async addUser(auth_user_id) {
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
		return fetch(`http://localhost:5000/api/v1/addreddituser`, {
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
	generateVerificationCode(auth_user_id, username) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id,
				"reddit_data": {
					"username": username
				}
			}
		}
		return fetch(`http://localhost:5000/api/v1/generateredditverificationcode`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then( jsonResponse => {
			return jsonResponse;
		});
	},
	validateVerificationCode(auth_user_id) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
			}
		}
		return fetch(`http://localhost:5000/api/v1/validateredditverificationcode`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
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
