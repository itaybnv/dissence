import networkController from "../networking/NetworkController";
import PacketType from "../misc/PacketType";

class PlaylistController {
	registerEventHandler = handler => {
		networkController.registerEventHandler(handler, PacketType.ADD_TO_PLAYLIST.toString());
	};

	downloadToPlaylist = video => {
		let dataBuffer = Buffer.from(JSON.stringify(video));
		networkController
			.send(dataBuffer, PacketType.DOWNLOAD_TO_PLAYLIST)
			.then(res => {
				console.log("reached after downloadtoplaylist")
                let data = JSON.parse(res.data.toString());
				if (data) {
					throw data.errorMessage;
				}
			});
	};
}

const playlistController = new PlaylistController();
export default playlistController;
