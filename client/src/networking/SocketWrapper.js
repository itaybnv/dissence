var net = window.require("net");
export default class SocketWrapper {
	constructor() {
		this.socket = new net.Socket();
	}

	connect = (ip, port) =>
		new Promise((resolve, reject) => {
			this.socket.on("error", error => {
				if (error.message.includes("ECONNREFUSED")) {
					reject(error);
				}
			});
			this.socket.connect(port, ip, resolve);
		});

	send = buffer =>
		new Promise((resolve, reject) => {
			try {
				console.log(buffer, buffer.toString());
				this.socket.write(buffer);
				resolve();
			} catch (error) {
				reject(error);
			}
		});

	registerReceiveHandler = handler =>
		this.socket.on("data", e => {
			console.log(e, e.toString());
			handler(e);
		});

	registerCloseHandler = handler => this.socket.on("close", handler);
}
