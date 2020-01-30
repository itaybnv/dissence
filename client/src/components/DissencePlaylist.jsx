import React, { Component } from "react";

import { List } from "@rmwc/list";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";
import { Scrollbars } from "react-custom-scrollbars";

import DissencePlaylistItem from "./DissencePlaylistItem";

export default class DissencePlaylist extends Component {
	getPlaylist = () => {
		if (this.props.playlist) {
			return this.props.playlist.map((item, index) => {
				return (
					<DissencePlaylistItem
						key={item.Id}
						index={index}
						videoTitle={item.Title}
						channelTitle={item.ChannelTitle}
						videoThumbnailUrl={item.ThumbnailUrl}
					/>
				);
			});
		}
	};

	render() {
		return (
			<div>
				<Drawer>
					<DrawerHeader>
						<DrawerTitle style={{ textAlign: "center" }}>Playlist</DrawerTitle>
					</DrawerHeader>
					<DrawerContent>
						<Scrollbars>
							<List>{this.getPlaylist()}</List>
						</Scrollbars>
					</DrawerContent>
				</Drawer>
			</div>
		);
	}
}
