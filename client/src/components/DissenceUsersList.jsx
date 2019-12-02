import React, { Component } from "react";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";
import { List, ListItem } from "@rmwc/list";
import userController from "../controllers/UsersController";

export default class DissenceUsersList extends Component {
	state = {
		nicknames: this.props.nicknames
	};

	// ***DEPRACTED***
	// componentDidMount() {
	// 	userController
	// 		.getConnectedUsers()
	// 		.then(res => {
	// 			this.setState({ nicknames: res.nicknames });
	// 		})
	// 		.catch(error => {
	// 			console.error(error);
	// 		});
	// }

	componentDidMount() {
		userController.registerEventHandler(data => {
			data = JSON.parse(data.toString());
			// nicknames isn't in list => means the nickname is you
			if (this.state.nicknames.indexOf(data.oldNickname) === -1) {
				this.setState({
					nicknames: [...this.state.nicknames, data.newNickname]
				});
				return;
			}

			// nickname is in the list already => update it
			let newNicknames = [...this.state.nicknames];
			newNicknames[newNicknames.indexOf(data.oldNickname)] = data.newNickname;
			this.setState({ nicknames: newNicknames });
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
