const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

const windowWidth = 920;
const windowHeight = 830;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: windowHeight,
		minWidth: windowWidth,
		minHeight: windowHeight,
		webPreferences: { nodeIntegration: true }
	});
	mainWindow.loadURL(
		isDev
			? "http://localhost:3000/"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);
	mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
