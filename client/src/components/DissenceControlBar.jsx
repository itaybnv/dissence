import React, { Component } from "react";

import { Fab } from "@rmwc/fab";
import { Icon } from "@rmwc/icon";
import { Slider } from "@rmwc/slider";
import { LinearProgress } from "@rmwc/linear-progress";
import { Typography } from "@rmwc/typography";

import audioController from "../controllers/AudioController";

import "./DissenceControlBar.scss";

export default class DissenceControlBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			volumeValue: 45,
			volumeIcon: "",
			playIcon: "play_circle_filled"
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

	onPlay = () => {
		// Audio is not playing
		if (this.state.playIcon === "play_circle_filled") {
			audioController.playAudio(true).then(() => {
				this.setState({ playIcon: "pause_circle_filled" });
			});
		}
		// Audio is playing
		else {
			audioController.playAudio(false).then(() => {
				this.setState({ playIcon: "play_circle_filled" });
			});
		}
	};

	render() {
		return (
			<div className="dissence-controlbar-container">
				<div className="dissence-online-container" style={{ height: "100%" }}>
					<Typography
						use="overline"
						style={{
							fontWeight: 900,
							fontSize: 16,
							color: "rgba(0, 0, 0, 0.30)",
							margin: "0 0 0px 6px"
						}}
					>
						{this.props.connected ? "online" : "offline"}
					</Typography>
				</div>
				<div className="dissence-media-control-container">
					<div className="dissence-media-buttons-container">
						<Fab
							className="dissence-play-button"
							icon={this.state.playIcon}
							mini
							onClick={this.onPlay}
						/>
						<Fab className="dissence-skip-button" icon="skip_next" mini />
					</div>
					<div className="dissence-progress-bar-container">
						<LinearProgress progress={0.1} buffer={0.4}></LinearProgress>
					</div>
				</div>
				<div className="dissence-volume-control-container">
					<Icon style={{ color: "white" }} icon={this.state.volumeIcon}></Icon>
					<Slider
						className="dissence-volume-slider"
						value={this.state.volumeValue}
						onChange={evt => this.changeVolume(evt.detail.value)}
						onInput={evt => this.changeVolume(evt.detail.value)}
					/>
				</div>
			</div>
		);
	}
}
