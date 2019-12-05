import networkController from "../networking/NetworkController";
import PacketType from "../misc/PacketType";

class PlaylistController {
	registerEventHandler = handler => {
		networkController.registerEventHandler(handler, PacketType.ADD_TO_PLAYLIST);
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
}

const playlistController = new PlaylistController();
export default playlistController;
