import React, { Component } from "react";

import { ListItem } from "@rmwc/list";
import { Typography } from "@rmwc/typography";
import { SimpleMenu, MenuItem } from "@rmwc/menu";

import "./DissencePlaylistItem.scss";

export default class DissencePlaylistItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoThumbnailUrl: props.videoThumbnailUrl
				? props.videoThumbnailUrl
				: "https://onaliternote.files.wordpress.com/2016/11/wp-1480230666843.jpg",
			videoTitle: props.videoTitle ? props.videoTitle : "Example Title."
		};
	}

	getListItem = () => {
		return (
			<ListItem>
				<img
					className="dissence-playlist-list-item-image"
					src={this.state.videoThumbnailUrl}
					alt="image error"
				></img>
				<Typography className="dissence-playlist-list-item-title" use="body2">
					{this.state.videoTitle}
				</Typography>
			</ListItem>
		);
	};

	render() {
		return (
			<SimpleMenu anchorCorner="bottomLeft" handle={this.getListItem()}>
				<MenuItem>Remove</MenuItem>
				<MenuItem>Bump</MenuItem>
			</SimpleMenu>
		);
	}
}
