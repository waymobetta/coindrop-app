const CoindropAuth = {
	signUp(auth_user_id) {
		return fetch(`http://localhost:5000/api/v1/adduserid`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({"auth_user_id": auth_user_id})
		}).then(res => {
			return res.json();
		}).then(jsonResponse => {
			return jsonResponse
			}
		);
	}
}

export default CoindropAuth;
