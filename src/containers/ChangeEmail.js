import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { 
	FormGroup, 
	FormControl, 
	HelpBlock, 
	ControlLabel 
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./ChangeEmail.css";

export default class ChangeEmail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			code: "",
			email: "",
			codeSent: false,
			isConfirming: false,
			isSendingCode: false
		};
	}

	validateEmailForm() {
		return this.state.email.length > 0;
	}

	validateConfirmForm() {
		return this.state.code.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleUpdateClick = async event => {
		event.preventDefault();

		this.setState({
			isSendingCode: true
		});

		try {
			const currentUser = await Auth.currentAuthenticatedUser();
			await Auth.updateUserAttributes(
				currentUser,
				{
					email: this.state.email
				}
			);

			this.setState({
				codeSent: true
			});
		} catch (e) {
			alert(e.message);
			this.setState({
				isSendingCode: false
			});
		}
	}

	handleConfirmClick = async event => {
		event.preventDefault();

		this.setState({
			isConfirming: true
		});

		try {
			await Auth.verifyCurrentUserAttributeSubmit(
				"email",
				this.state.code
			);

			this.props.history.push("/settings/emailsuccess");
		} catch (e) {
			alert(e.message);
			this.setState({
				isConfirming: false
			});
		}
	}

	renderUpdateForm() {
		return (
			<form onSubmit={this.handleUpdateClick}>
				<FormGroup
					bsSize="large"
					controlId="email">
					<ControlLabel>New Email</ControlLabel>
					<FormControl
						autoFocus
						type="email"
						value={this.state.email}
						placeholder="enter your new email here"
						onChange={this.handleChange}
					/>
				</FormGroup>
				<LoaderButton
					block
					type="submit"
					bsSize="large"
					text="Update Email"
					loadingText="Updating.."
					disabled={!this.validateEmailForm()}
					isLoading={this.state.isSendingCode}
				/>
			</form>
		);
	}

	renderConfirmationForm() {
		return (
			<form onSubmit={this.handleConfirmClick}>
				<FormGroup
					bsSize="large"
					controlId="code">
					<ControlLabel>Confirmation Code</ControlLabel>
					<FormControl
						autoFocus
						type="tel"
						value={this.state.code}
						onChange={this.handleChange}
					/>
					<HelpBlock>
						Please check your email ({this.state.email}) for the confirmation code.
					</HelpBlock>
				</FormGroup>
				<LoaderButton
					block
					type="submit"
					bsSize="large"
					text="Confirm"
					loadingText="Confirm.."
					disabled={!this.validateConfirmForm()}
					isLoading={this.state.isConfirming}
				/>
			</form>
		);
	}

	render() {
		return (
			<div className="ChangeEmail">
			<div>
				<p align="center">If you'd like to change your email, this is the place to do it!</p>
				<br >
				</br>
			</div>
				{!this.state.codeSent
					? this.renderUpdateForm()
					: this.renderConfirmationForm()}
			</div>
		);
	}
}
