import React, { Component } from "react";

import { Elevation } from "@rmwc/elevation";
import { Typography } from "@rmwc/typography";
import { Ripple } from "@rmwc/ripple";

import playlistController from "./../controllers/PlaylistController";

import "./DissenceVideoCard.scss";

export default class DissenceVideoCard extends Component {
	onVideoClick = () => {
		let video = {
			id: this.props.id,
			thumbnailUrl: this.props.videoThumbnailUrl,
			title: this.props.videoTitle,
			channelTitle: this.props.channelTitle,
			videoDuration: this.getMilliseconds(this.props.videoDuration)
		};
		playlistController.downloadToPlaylist(video).catch(e => {
			console.log(e);
		});
	};

	getMilliseconds = duration => {
		var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
		var minutes = 0,
			seconds = 0;

		if (reptms.test(duration)) {
			var matches = reptms.exec(duration);
			if (matches[2]) minutes = Number(matches[2]);
			if (matches[3]) seconds = Number(matches[3]);
		}
		return minutes * 60000 + seconds * 1000;
	};

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
							src={this.props.videoThumbnailUrl}
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
							{this.props.videoTitle}
						</Typography>
						<Typography
							className="dissence-video-card-channel"
							use="caption"
							theme="textSecondaryOnBackground"
						>
							{this.props.channelTitle}
						</Typography>
					</div>
				</Elevation>
			</Ripple>
		);
	}
}
