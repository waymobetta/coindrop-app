import React, { Component } from 'react';
import './Badge.css';

export default class Badge extends Component {

	render() {	
		
		const { badge } = this.props;

		return (
			<div className="Badge">
				<div className="image-container">
					<img src={badge.imageSrc} alt='' width="60" height="52" />
				</div>
				<h2>{badge.name}</h2>
				<div className="Badge-information">
					<p>{badge.description}</p>
				</div>
			</div>
		);
	}
}
