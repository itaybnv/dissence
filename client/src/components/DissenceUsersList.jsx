import React, { Component } from "react";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";
import { List, ListItem } from "@rmwc/list";
import userController from "../controllers/UsersController";

export default class DissenceUsersList extends Component {
	state = { nicknames: this.props.nicknames };

	componentDidMount() {
		userController.registerEventHandler(data => {
			data = JSON.parse(data.toString());
			this.setState({ nicknames: data.nicknames });
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
