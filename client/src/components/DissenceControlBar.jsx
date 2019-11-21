import React, { Component } from "react";

import { Fab } from "@rmwc/fab";
import { Icon } from "@rmwc/icon";
import { Slider } from "@rmwc/slider";
import { LinearProgress } from "@rmwc/linear-progress";

import "./DissenceControlBar.scss";

export default class DissenceControlBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			volumeValue: 45,
			volumeIcon: ""
		};
	}

	componentDidMount = () => {
		this.setVolumeIcon();
	};

	changeVolume = value => {
		this.setState({ volumeValue: value });

		this.setVolumeIcon();
	};

	setVolumeIcon = () => {
		if (this.state.volumeValue === 0) {
			this.setState({ volumeIcon: "volume_off" });
		} else if (this.state.volumeValue > 0 && this.state.volumeValue <= 33) {
			this.setState({ volumeIcon: "volume_mute" });
		} else if (this.state.volumeValue > 33 && this.state.volumeValue <= 66) {
			this.setState({ volumeIcon: "volume_down" });
		} else {
			this.setState({ volumeIcon: "volume_up" });
		}
	};

	render() {
		return (
			<div className="dissence-controlbar-container">
				<div className="ghost" style={{ width: "80px" }} />
				<div className="dissence-media-control-container">
					<div className="dissence-media-buttons-container">
						<Fab
							className="dissence-play-button"
							icon="play_circle_filled"
							mini
						/>
						<Fab className="dissence-skip-button" icon="skip_next" mini />
					</div>
					<div className="dissence-progress-bar-container">
						<LinearProgress progress={0.1} buffer={0.4}></LinearProgress>
					</div>
				</div>
				<div className="dissence-volume-control-container">
					<Icon
						style={{ color: "white", transition: "all 1s" }}
						icon={this.state.volumeIcon}
					></Icon>
					<Slider
						className="dissence-volume-slider"
						value={this.state.volumeValue}
						onChange={evt => this.changeVolume(evt.detail.value)}
						onInput={evt => this.changeVolume(evt.detail.value)}
					></Slider>
				</div>
			</div>
		);
	}
}