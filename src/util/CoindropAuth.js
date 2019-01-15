const CoindropAuth = {
	async signUp(auth_user_id) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
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
	async updateWallet(auth_user_id, wallet_address) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id,
				"wallet_address": wallet_address
			}
		}
		return fetch(`http://localhost:5000/api/v1/updatewallet`, {
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
	async getUserWallet(auth_user_id) {
		const payload = {
			"info": {
				"auth_user_id": auth_user_id
			}
		}
		return fetch(`http://localhost:5000/api/v1/getwalletaddress`, {
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
	}
}

export default CoindropAuth;
