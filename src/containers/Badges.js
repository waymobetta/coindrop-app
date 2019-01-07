import React, { Component } from "react";
import Badge from "./Badge";
import "./Badges.css";

export default class Badges extends Component {
	constructor(props) {
		super(props);

		this.state = {
			badgeList: []
		};
	}

	componentWillMount() {
			const badgeList = [
			{
				name: "adChain associate",
				description: "awarded to those who have helped curate our TCR, the adChain Registry",
				imageSrc: "https://user-images.githubusercontent.com/17755587/50762314-705eea00-1221-11e9-8a1e-0accf433e799.png"
			},
			{
				name: "colony conscious",
				description: "rewarded to those who helped us during our token distribution event",
				imageSrc: "https://user-images.githubusercontent.com/17755587/50762284-5e7d4700-1221-11e9-92a4-aa349565301a.png"
			}
		];

		this.setState({
			badgeList: badgeList
		});
	}

  render() {
    return (
      <div className="Badges">
        <div className="lander">
          <h1>badges</h1>
          	<div align="center">
	          	{
	          		this.state.badgeList.map(badge => {
	          			return <Badge key={"Badge_"+badge.name} badge={badge} />;
	          		})
	          	}
          	</div>
        </div>
      </div>
    );
  }
}
