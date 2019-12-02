import React, { Component } from "react";

import "./DissenceSearchContent.scss";
import DissenceVideoCard from "./DissenceVideoCard";

import { Scrollbars } from "react-custom-scrollbars";
import { Typography } from "@rmwc/typography";

export default class DissenceSearchContent extends Component {
	render() {
		return (
			<div className="dissence-search-content-container">
				<Scrollbars>
					<Typography use="body1" style={{ opacity: "0.3" }}>
						{this.props.searchQuery
							? "Showing results for: " + this.props.searchQuery
							: ""}
					</Typography>
					<div className="dissence-search-content">
						{this.props.searchResults.map(video => (
							<DissenceVideoCard
								key={video.Id}
								id={video.Id}
								channelTitle={video.ChannelTitle}
								videoTitle={video.Title}
								videoThumbnailUrl={video.ThumbnailUrl}
								videoDuration={video.VideoLength}
							/>
						))}
					</div>
				</Scrollbars>
			</div>
		);
	}
}
