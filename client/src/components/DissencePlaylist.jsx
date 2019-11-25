import React, { Component } from "react";

import { List } from "@rmwc/list";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";
import DissencePlaylistItem from "./DissencePlaylistItem";
import { Scrollbars } from "react-custom-scrollbars";

import playlistController from "./../controllers/PlaylistController";

export default class DissencePlaylist extends Component {
	constructor(props) {
		super(props);
		this.state = { playlist: [] };
		playlistController.registerEventHandler(data => {
			data = JSON.parse(data.toString());
			this.setState({
				playlist: [
					...this.state.playlist,
					<DissencePlaylistItem
						key={Math.random()}
						videoTitle={data.title}
						channelTitle={data.channelTitle}
						videoThumbnailUrl={data.thumbnailUrl}
					/>
				]
			});
			console.log(this.state.playlist);
		});
	}

	render() {
		return (
			<div>
				<Drawer>
					<DrawerHeader>
						<DrawerTitle style={{ textAlign: "center" }}>Playlist</DrawerTitle>
					</DrawerHeader>
					<DrawerContent>
						<Scrollbars>
							<List>{this.state.playlist}</List>
						</Scrollbars>
					</DrawerContent>
				</Drawer>
			</div>
		);
	}
}
