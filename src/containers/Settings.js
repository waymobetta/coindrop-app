import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";

export default class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className="Settings">
				<h1 align="center">settings</h1>
				<p>
				<LinkContainer to="/settings/email">
					<LoaderButton
						block
						bsSize="large"
						text="update email"
					/>
				</LinkContainer>
				<LinkContainer to="/settings/password">
					<LoaderButton
						block
						bsSize="large"
						text="update password"
					/>
				</LinkContainer>
				</p>
			</div>
		);
	}
}
