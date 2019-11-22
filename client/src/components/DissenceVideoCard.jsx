import React, { Component } from "react";

import { Elevation } from "@rmwc/elevation";
import { Typography } from "@rmwc/typography";
import { Ripple } from "@rmwc/ripple";

import "./DissenceVideoCard.scss";

export default class DissenceVideoCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoTitle: props.videoTitle ? props.videoTitle : "video title",
			channelTitle: props.channelTitle ? props.channelTitle : "channel title",
			videoThumbnailUrl: props.videoThumbnailUrl
		};
	}

	onVideoClick = () => {};

	formatVideoDuration = duration => {
		let array = duration.match(/(\d+)(?=[MHS])/gi) || [];
		return array
			.map(function(item) {
				if (item.length < 2) return "0" + item;
				return item;
			})
			.join(":");
	};

	render() {
		return (
			<Ripple onClick={this.onVideoClick}>
				<Elevation className="dissence-video-card-container" z={3}>
					<div className="dissence-video-card-thumbnail-container">
						<img
							className="dissence-Video-card-image"
							src={this.state.videoThumbnailUrl}
							alt="Thumbnail"
						/>
						<Typography className="dissence-video-card-duration" use="caption">
							{this.formatVideoDuration(this.props.videoDuration)}
						</Typography>
					</div>
					<div className="dissence-video-info-container">
						<Typography
							className="dissence-video-card-title"
							use="headline6"
							tag="h3"
						>
							{this.state.videoTitle}
						</Typography>
						<Typography
							className="dissence-video-card-channel"
							use="caption"
							theme="textSecondaryOnBackground"
						>
							{this.state.channelTitle}
						</Typography>
					</div>
				</Elevation>
			</Ripple>
		);
	}
}
