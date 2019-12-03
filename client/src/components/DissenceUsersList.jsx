import React, { Component } from "react";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";
import { List, ListItem } from "@rmwc/list";

export default class DissenceUsersList extends Component {
	render() {
		return (
			<Drawer className="dissence-users-list-drawer" dir="rtl">
				<DrawerHeader>
					<DrawerTitle style={{ textAlign: "center" }}>
						Currently listening
					</DrawerTitle>
				</DrawerHeader>
				<DrawerContent>
					<List>
						{this.props.nicknames.map(nick => (
							<ListItem
								style={{
									alignItems: "center",
									justifyContent: "center",
									fontWeight: nick === this.props.nickname ? "bold" : "normal"
								}}
								key={nick}
							>
								{nick}
							</ListItem>
						))}
					</List>
				</DrawerContent>
			</Drawer>
		);
	}
}
