import React, { Component } from "react";

import { List } from "@rmwc/list";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";
import DissencePlaylistItem from "./DissencePlaylistItem";
import { Scrollbars } from "react-custom-scrollbars";

export default class DissencePlaylist extends Component {
	render() {
		return (
			<div>
				<Drawer>
					<DrawerHeader>
						<DrawerTitle style={{ textAlign: "center" }}>Playlist</DrawerTitle>
					</DrawerHeader>
					<DrawerContent>
						<Scrollbars>
							<List>
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
								<DissencePlaylistItem />
							</List>
						</Scrollbars>
					</DrawerContent>
				</Drawer>
			</div>
		);
	}
}
