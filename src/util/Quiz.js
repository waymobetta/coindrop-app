const Tasks = {
	async submitAnswers(quizObj, jwt_token) {
		const payload = quizObj;
		return fetch(`http://localhost:5000/api/v1/getresults`, {
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

export default Quiz;
