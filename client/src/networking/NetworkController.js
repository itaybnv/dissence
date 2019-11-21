import Socket from "./Socket";
import AsyncLock from "async-lock";
import WaitQueue from "wait-queue";

class NetworkController {
	HEADER_LENGTH = 5;
	socket = new Socket();
	lock = new AsyncLock();
	responseQueue = new WaitQueue();
	eventHandlers = {};

	constructor() {
		this.socket.registerReceiveHandler(data => {
			let packetType = data[0];
			// disconnect packet type from packet data
			data = data.slice(1);

			if (packetType < 200) {
				this.responseQueue.push(data);
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
		const lengthBuffer = Buffer.alloc(4);
		new DataView(b).setUint32(0, buffer.length);

		// Set the packet type in a buffer to get it ready for concat
		// with the rest of the header
		const typeBuffer = Buffer.alloc(1);
		typeBuffer[0] = packetType;

		// Concat the length and type to form the header
		const headerBuffer = Buffer.concat([lengthBuffer, typeBuffer]);

		// Create one packet for the data and the header and concat them
		const packetBuffer = Buffer.concat([headerBuffer, buffer]);

		return new Promise(resolve =>
			this.lock.acquire("socket", async () => {
				this.socket.send(packetBuffer);

				resolve(await this.responseQueue.shift());
			})
		);
	};

	// Controllers will register their callback func to each data type from the
	// event group (type => 200) and their callback will get called when the type
	// they specified comes in to the eventQueue
	registerEventHandler = (handler, type) => {
		this.eventHandlers[type] = { ...this.eventHandlers[type], handler };
	};
}

// acts as a singlet on
const networkController = new NetworkController();
export default networkController;
