var net = window.require("net");
export default class SocketWrapper {
	constructor() {
		this.socket = new net.Socket();
	}

	connect = (ip, port) =>
		new Promise((resolve, reject) => {
			try {
				this.socket.connect(port, ip);
			} catch (error) {
				reject(error);
			}
			resolve();
		});

	send = buffer =>
		new Promise((resolve, reject) => {
			try {
				this.socket.write(buffer);
				resolve();
			} catch (error) {
				reject(error);
			}
		});

	registerReceiveHandler = handler => this.socket.on("data", handler);
}
