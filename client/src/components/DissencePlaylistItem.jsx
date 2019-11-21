import React, { Component } from "react";

import { ListItem } from "@rmwc/list";
import { Typography } from "@rmwc/typography";
import { SimpleMenu, MenuItem } from "@rmwc/menu";

import Ticker from "react-ticker";

import "./DissencePlaylistItem.scss";

export default class DissencePlaylistItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textScroll: false,
			videoThumbnailUrl: props.videoThumbnailUrl
				? props.videoThumbnailUrl
				: "https://onaliternote.files.wordpress.com/2016/11/wp-1480230666843.jpg",
			videoTitle: props.videoTitle ? props.videoTitle : "Example Title."
		};
	}

	getListItem = () => {
		return (
			<ListItem
				onMouseEnter={() => this.setState({ textScroll: true })}
				onMouseLeave={() => this.setState({ textScroll: false })}
			>
				<img
					className="dissence-playlist-list-item-image"
					src={this.state.videoThumbnailUrl}
					alt="image error"
				></img>
				<Typography
					className="dissence-playlist-list-item-title"
					use="body2"
					style={{ width: "100%" }}
				>
					<Ticker move={this.state.textScroll}>
						{() => <span>{this.state.videoTitle}</span>}
					</Ticker>
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
