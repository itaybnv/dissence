import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App.jsx";
import { ThemeProvider } from "@rmwc/theme";
import options from "./misc/themeOptions";

let app = (
	<ThemeProvider options={options}>
		<App />
	</ThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
