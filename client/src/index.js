import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App.jsx";
import { ThemeProvider } from "@rmwc/theme";
import options from "./misc/themeOptions";
import networkController from "./networking/NetworkController";

// connect to the server
networkController.connect().then(
	() => {
		console.log("Connected to server succesfully");
	}
).catch(error => {
  console.log("error: " + error)
});

let app = (
	<ThemeProvider options={options}>
		<App />
	</ThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
