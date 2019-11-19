import { Socket } from "net";

export default class Socket {
  constructor() {
    this.socket = new Socket();
  }

  connect = (ip, port) =>
    new Promise((resolve, reject) => {
      try {
        this.socket.connect(port, ip);
        resolve();
      } catch (error) {
        reject(error);
      }
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
