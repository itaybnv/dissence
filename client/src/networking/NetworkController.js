import SocketWrapper from "./SocketWrapper";
import AsyncLock from "async-lock";
import WaitQueue from "wait-queue";
import arrayBufferToBuffer from "arraybuffer-to-buffer";

class NetworkController {
	HEADER_LENGTH = 5;
	socket = new SocketWrapper();
	lock = new AsyncLock();
	responseQueue = new WaitQueue();
	eventHandlers = {};

	constructor() {
		this.socket.registerReceiveHandler(data => {
			let packetType = data[0];
			// disconnect packet type from packet data
			data = data.slice(1);

			if (packetType < 200) {
				this.responseQueue.push({ packetType, data });
			} else {
				//route event to correct handler/s
				// try in case there are no eventhandlers registered
				// for the packet type
				try {
					for (var handler in this.eventHandlers[packetType]) {
						handler(data);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});
	}

	connect = () => this.socket.connect("127.0.0.1", 27015);

	send = (buffer, packetType) => {
		// Convert packet length from int to buffer
		let lengthBuffer = new ArrayBuffer(4);
		new DataView(lengthBuffer).setUint32(0, buffer.length);
		lengthBuffer = arrayBufferToBuffer(lengthBuffer);

		// Set the packet type in a buffer to get it ready for concat
		// with the rest of the header
		const typeBuffer = Buffer.alloc(1);
		typeBuffer[0] = packetType;

		// Concat the length and type to form the header
		const headerBuffer = Buffer.concat([lengthBuffer, typeBuffer]);

		// Create one packet for the data and the header and concat them
		const packetBuffer = Buffer.concat([headerBuffer, buffer]);

		return new Promise((resolve, reject) =>
			this.lock.acquire("socket", async () => {
				await this.socket.send(packetBuffer).then(async () => {
					resolve(await this.responseQueue.shift());
				}).catch(error => reject(error));
			})
		);
	};

	// Controllers will register their callback func to each data type from the
	// event group (type => 200) and their callback will get called when the type
	// they specified comes in to the eventQueue
	registerEventHandler = (handler, type) => {
		this.eventHandlers[type] = { ...this.eventHandlers[type], handler };
	};

	registerCloseHandler = handler => {
		this.socket.registerCloseHandler(handler);
	}
}

// Acts as a singleton
const networkController = new NetworkController();
export default networkController;
