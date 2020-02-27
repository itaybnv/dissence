import audioController from "../controllers/AudioController";
import playlistController from "../controllers/PlaylistController";

const { OpusDecoder, RtAudio } = window.require("audify");
const dgram = window.require("dgram");

const sampleRate = 48000;
const frameDuration = 40;
const channels = 2;
const frameSize = (sampleRate * frameDuration) / 1000;

class AudioManager {
	constructor() {
		this.decoder = new OpusDecoder(sampleRate, channels);
		this.audio = new RtAudio();
		this.client = dgram.createSocket("udp4");
		this.progressPerFrame = 0;

		this.audio.openStream(
			{ nChannels: channels, deviceId: this.audio.getDefaultOutputDevice() },
			null,
			0x2,
			sampleRate,
			frameSize,
			"DissenceStream",
			null
		);
		this.client.on("message", this.handleAudioPacket);

		// Bind event handlers
		audioController.registerPlayHandler(playOrStop => {
			playOrStop = JSON.parse(playOrStop.toString());
			if (playOrStop.playOrStop) {
				this.audio.start();
			} else {
				this.audio.stop();
			}
		});

		playlistController.registerSkipHandler(() => {
			this.audio.stop();
			this.audio.clearOutputQueue();
			this.audio.start();
		});
	}

	setFrameCallback = callback => {
		this.audio.setFrameOutputCallback(callback);
	};

	handleAudioPacket = buf => {
		try {
			this.audio.write(this.decoder.decode(buf, frameSize));
		} catch (error) {}
	};

	connect = channelName =>
		new Promise((resolve, reject) => {
			this.client.send(channelName, 27015, "127.0.0.1", error => {
				if (error) {
					reject(error);
					this.client.close();
				} else {
					resolve();
				}
			});
		});

	setVolume = value => {
		this.audio.outputVolume = value;
	};
}

const audioManager = new AudioManager();
export default audioManager;
