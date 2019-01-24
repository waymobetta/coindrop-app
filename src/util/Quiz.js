const Quiz = {
	async postAnswers(quizObj, jwt_token) {
		const payload = {
			"title": quizObj.title,
			"auth_user_id": quizObj.userID,
			"quiz_info": {
				"quiz_data": [
					{
						"question": "",
						"answer": quizObj.qOneAns
					},
					{
						"question": "",
						"answer": quizObj.qTwoAns
					},
					{
						"question": "",
						"answer": quizObj.qThreeAns
					},
					{
						"question": "",
						"answer": quizObj.qFourAns
					},
					{
						"question": "",
						"answer": quizObj.qFiveAns
					}
				]
			}
		}
		return fetch(`http://localhost:5000/api/v1/postresults`, {
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
	async getResults(quizObj, jwt_token) {
		const payload = {
			"title": quizObj.title,
			"auth_user_id": quizObj.userID
			}
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
