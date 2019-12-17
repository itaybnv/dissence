import networkController from "../networking/NetworkController";
import PacketType from "../misc/PacketType";

class AudioController {
    registerPlayHandler = handler => {
		networkController.registerEventHandler(handler, PacketType.PLAY_AUDIO);
	};

    // playOrStop is a bool: 
    // true is play the audio false is stop the audio
	playAudio = playOrStop =>
		new Promise(resolve => {
			networkController
				.send(Buffer.from(JSON.stringify({playOrStop})), PacketType.PLAY_AUDIO)
				.then(resolve); // Not expecting a result from this packet (type > 199)
		});
}

const audioController = new AudioController();
export default audioController;
