import audioController from "../controllers/AudioController";

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

		this.audio.openStream(
			{ nChannels: channels, deviceId: 4 },
			null,
			0x2,
			sampleRate,
			frameSize,
			"DissenceStream",
			null
		);
		this.client.on("message", this.handleAudioPacket);

		// Bind event handler
		audioController.registerPlayHandler(playOrStop => {
			playOrStop = JSON.parse(playOrStop.toString());
			if (playOrStop.playOrStop) {
				this.audio.start();
			} else {
				this.audio.stop();
			}
		});
	}

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
}

const audioManager = new AudioManager();
export default audioManager;
