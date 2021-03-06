import React, { Component } from "react";

import { Fab } from "@rmwc/fab";
import { Icon } from "@rmwc/icon";
import { Slider } from "@rmwc/slider";
import { LinearProgress } from "@rmwc/linear-progress";
import { Typography } from "@rmwc/typography";

import audioController from "../controllers/AudioController";

import "./DissenceControlBar.scss";
import playlistController from "../controllers/PlaylistController";
import audioManager from "../audio/AudioManager";

export default class DissenceControlBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			volumeValue: 10,
			volumeIcon: "",
			playIcon: "play_circle_filled"
		};

		audioController.registerPlayHandler(playOrStop => {
			playOrStop = JSON.parse(playOrStop.toString()).playOrStop;
			this.setState({
				playIcon: playOrStop ? "pause_circle_filled" : "play_circle_filled"
			});
		});
	}

	componentDidMount = () => {
		this.setVolumeIcon();
		this.changeVolume(this.state.volumeValue);
	};

	changeVolume = value => {
		this.setState({ volumeValue: value });
		this.setVolumeIcon();

		//change actual volume
		audioManager.setVolume(value / 100);
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
			audioController.playAudio(true);
		}
		// Audio is playing
		else {
			audioController.playAudio(false);
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
						<Fab
							className="dissence-skip-button"
							icon="skip_next"
							mini
							onClick={playlistController.skipCurrent}
						/>
					</div>
					<div className="dissence-progress-bar-container">
						<LinearProgress
							progress={this.props.progress}
							style={{ height: "6px" }}
						></LinearProgress>
					</div>
				</div>
				<div className="dissence-volume-control-container">
					<Icon style={{ color: "white" }} icon={this.state.volumeIcon}></Icon>
					<Slider
						className="dissence-volume-slider"
						value={this.state.volumeValue}
						step={0.1}
						onChange={evt => this.changeVolume(evt.detail.value)}
						onInput={evt => this.changeVolume(evt.detail.value)}
					/>
				</div>
			</div>
		);
	}
}
