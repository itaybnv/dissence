import React, { Component } from "react";

import "./DissenceSearchContent.scss";
import DissenceVideoCard from "./DissenceVideoCard";

import { Scrollbars } from "react-custom-scrollbars";

export default class DissenceSearchContent extends Component {
	render() {
		return (
			<div className="dissence-search-content-container">
				<Scrollbars>
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
