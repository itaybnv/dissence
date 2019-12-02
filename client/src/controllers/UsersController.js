import networkController from "../networking/NetworkController";
import PacketType from "../misc/PacketType";

class UserController {
	getConnectedUsers = () =>
		new Promise(resolve => {
			networkController
				.send(Buffer.from("{}"), PacketType.GET_CONNECTED_USERS)
				.then(res => {
					let data = JSON.parse(res.data.toString());
					resolve(data);
				})
				.catch(error => {
					console.error(error);
				});
		});

	updateNickname = nick => {
		new Promise(() => {
			let data = Buffer.from('{ "nickname": "' + nick + '" }');
			networkController.send(data, PacketType.UPDATE_NICKNAME);
		});
	};

	registerEventHandler = handler => {
		networkController.registerEventHandler(handler, PacketType.UPDATE_NICKNAME);
	};
}

const userController = new UserController();
export default userController;
