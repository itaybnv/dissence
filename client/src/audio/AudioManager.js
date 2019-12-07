import OpusScript from "opusscript";

const dgram = window.require("dgram");

class AudioManager {
	client = dgram.createSocket("udp4");
    encoder = new OpusScript(48000, 2)

	constructor() {
		this.client.on("message", buf => {
		});
	}

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
