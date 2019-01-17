const CoindropAuth = {
	async signUp(auth_user_id, jwt_token) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id,
				"Authorization": "Bearer " + jwt_token
			}
		}
		return fetch(`http://localhost:5000/api/v1/adduserid`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then(jsonResponse => {
			return jsonResponse
		});
	},
	async updateWallet(auth_user_id, wallet_address, jwt_token) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id,
				"wallet_address": wallet_address
			}
		}
		return fetch(`http://localhost:5000/api/v1/updatewallet`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Authorization": "Bearer " + jwt_token
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then(jsonResponse => {
			return jsonResponse
		});
	},
	async getUserWallet(auth_user_id, jwt_token) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
			}
		}
		return fetch(`http://localhost:5000/api/v1/getwalletaddress`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Authorization": "Bearer " + jwt_token
			},
			body: JSON.stringify(payload)
		}).then(res => {
			return res.json();
		}).then(jsonResponse => {
			return jsonResponse
		});
	}
}

export default CoindropAuth;
