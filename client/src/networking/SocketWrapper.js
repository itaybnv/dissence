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
				this.socket.write(buffer);
				resolve();
			} catch (error) {
				reject(error);
			}
		});

	registerReceiveHandler = handler => this.socket.on("data", handler);

	registerCloseHandler = handler => this.socket.on("close", handler); 
}
