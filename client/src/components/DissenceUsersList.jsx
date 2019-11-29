import React, { Component } from "react";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";
import { List, ListItem } from "@rmwc/list";
import userController from "./../controllers/UsersController";

export default class DissenceUsersList extends Component {
	state = { nicknames: [] };

	componentDidMount() {
		userController
			.getConnectedUsers()
			.then(res => {
				this.setState({ nicknames: res.nicknames });
			})
			.catch(error => {
				console.error(error);
			});
	}

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
						{this.state.nicknames.map(nick => (
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
