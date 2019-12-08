const Speaker = window.require("speaker");
const dgram = window.require("dgram");
const opus = window.require("node-opus");

const sampleRate = 48000;
const frameDuration = 40;
const channels = 2;
const bitDepth = 16;
const frameSize = (sampleRate * frameDuration) / 1000;

class AudioManager {
	constructor() {
		this.client = dgram.createSocket("udp4");
		this.encoder = new opus.OpusEncoder(sampleRate);
		this.speaker = new Speaker({
			channels,
			bitDepth,
			sampleRate,
			samplesPerFrame: frameSize
		});

		this.client.on("message", this.handleAudioPacket);
	}

	handleAudioPacket = buf => {
		try {
			let pcm = this.encoder.decode(buf, frameSize);
			console.log(buf.length);
			this.speaker.write(pcm);
		} catch (error) {}
	};

	connect = () =>
		new Promise((resolve, reject) => {
			this.client.connect(27015, "127.0.0.1", () => {
				this.client.send("a", error => {
					if (error) {
						reject(error);
						this.client.close();
					} else {
						resolve();
					}
				});
			});
		});
}

const audioManager = new AudioManager();
export default audioManager;
