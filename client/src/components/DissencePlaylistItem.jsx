import React, { Component } from "react";

import { ListItem } from "@rmwc/list";
import { Typography } from "@rmwc/typography";
import { SimpleMenu, MenuItem } from "@rmwc/menu";

import Ticker from "react-ticker";

import "./DissencePlaylistItem.scss";
import playlistController from "../controllers/PlaylistController";

export default class DissencePlaylistItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textScroll: false
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
					src={
						this.props.videoThumbnailUrl
							? this.props.videoThumbnailUrl
							: "https://onaliternote.files.wordpress.com/2016/11/wp-1480230666843.jpg"
					}
					alt="thumbnail"
				></img>
				<Typography
					className="dissence-playlist-list-item-title"
					use="body2"
					style={{ width: "100%" }}
				>
					<Ticker move={this.state.textScroll} mode="smooth">
						{({ index }) =>
							index % 2 === 0 ? (
								<div
									style={{
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										paddingRight: "50px"
									}}
								>
									{this.props.videoTitle
										? this.props.videoTitle
										: "Exmaple Video Title"}
								</div>
							) : (
								<div
									style={{
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										paddingRight: "50px"
									}}
								>
									{this.props.channelTitle
										? this.props.channelTitle
										: "Example Channel title"}
								</div>
							)
						}
					</Ticker>
				</Typography>
			</ListItem>
		);
	};

	render() {
		return (
			<SimpleMenu anchorCorner="bottomLeft" handle={this.getListItem()}>
				<MenuItem
					onClick={() => playlistController.removeSelected(this.props.index)}
				>
					Remove
				</MenuItem>
			</SimpleMenu>
		);
	}
}
