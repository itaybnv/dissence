import networkController from "../networking/NetworkController";
import PacketType from "../misc/PacketType";

class PlaylistController {
	registerEventHandler = handler => {
		networkController.registerEventHandler(handler, PacketType.ADD_TO_PLAYLIST);
	};

	registerSkipHandler = handler => {
		networkController.registerEventHandler(handler, PacketType.SKIP_AUDIO);
	};

	registerRemoveHandler = handler => {
		networkController.registerEventHandler(handler, PacketType.REMOVE_AUDIO);
	};

	downloadToPlaylist = video =>
		new Promise((resolve, reject) => {
			let dataBuffer = Buffer.from(JSON.stringify(video));
			networkController
				.send(dataBuffer, PacketType.DOWNLOAD_BY_ID)
				.catch(reject);
		});

	getPlaylist = () =>
		new Promise(resolve => {
			networkController
				.send(Buffer.from("{}"), PacketType.GET_PLAYLIST)
				.then(res => {
					resolve(JSON.parse(res.data.toString()));
				});
		});

	skipCurrent = () => {
		new Promise(resolve => {
			networkController
				.send(Buffer.from("{}"), PacketType.SKIP_AUDIO)
				.then(resolve);
		});
	};

	removeSelected = id => {
		new Promise(resolve => {
			networkController
				.send(Buffer.from(JSON.stringify({ id })), PacketType.REMOVE_AUDIO)
				.then(resolve);
		});
	};
}

const playlistController = new PlaylistController();
export default playlistController;
