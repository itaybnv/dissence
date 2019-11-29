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
}

const userController = new UserController();
export default userController;
