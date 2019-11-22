import React, { Component } from "react";

import "./DissenceSearchContent.scss";
import DissenceVideoCard from "./DissenceVideoCard";

import { Scrollbars } from "react-custom-scrollbars";

export default class DissenceSearchContent extends Component {

	render() {
		console.log(this.props.searchResults);
		return (
			<div className="dissence-search-content-container">
				<Scrollbars>
					<div className="dissence-search-content">
						{this.props.searchResults.map(video => (
							<DissenceVideoCard
								key={video.Id}
								channelTitle={video.ChannelTitle}
								videoTitle={video.Title}
								videoThumbnailUrl={video.ThumbnailUrl}
							/>
						))}
					</div>
				</Scrollbars>
			</div>
		);
	}
}
