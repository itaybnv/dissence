import React, { Component } from "react";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";
import { List, ListItem } from "@rmwc/list";
import userController from "../controllers/UsersController";

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
									justifyContent: "center"
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
