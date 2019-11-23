import React, { Component } from "react";
import networkController from "./networking/NetworkController";

import DissenceUsersList from "./components/DissenceUsersList";
import DissencePlaylist from "./components/DissencePlaylist";
import DissenceControlBar from "./components/DissenceControlBar";
import DissenceSearchContent from "./components/DissenceSearchContent";
import searchController from "./controllers/SearchController";

import {
	TopAppBar,
	TopAppBarFixedAdjust,
	TopAppBarRow,
	TopAppBarSection,
	TopAppBarTitle
} from "@rmwc/top-app-bar";
import { TextField } from "@rmwc/textfield";
import { CircularProgress } from "@rmwc/circular-progress";
import { DialogQueue } from "@rmwc/dialog";

import "./App.scss";
import "@rmwc/circular-progress/circular-progress.css";
import { queue } from "./components/DissenceDialogQueue";

class App extends Component {
	state = { searchValue: "", results: []};

	connectToServer = () =>
		new Promise((resolve, reject) => {
			networkController
				.connect()
				.then(() => {
					resolve();
				})
				.catch(() => {
					
				})
		});

	onSearch = evt => {
		evt.preventDefault();
		this.setState({ results: [] });
		searchController.ByTitle(this.state.searchValue).then(results => {
			this.setState({ results: results.results });
		});
	};

	componentDidMount() {
		networkController.registerCloseHandler(() => {
			queue
				.confirm({
					title: "test",
					body: "The connection to the server has been dropped",
					acceptLabel: "Retry",
					cancelLabel: "Quit"
				})
				.then(res => {
					if (res) {
						this.connectToServer();
					} else {
						const electron = window.require("electron");
						electron.remote.app.quit();
					}
				});
		});

		this.connectToServer()
			.then(() => {
				searchController.ByTitle("").then(results => {
					this.setState({ results: results.results });
				});
			})
	}

	getSearchContent = () => {
		if (this.state.results.length === 0) {
			return (
				<div className="dissence-search-content-loading-container">
					<CircularProgress
						className="dissence-search-content-loading"
						size="xlarge"
						theme="secondary"
					/>
				</div>
			);
		} else {
			return <DissenceSearchContent searchResults={this.state.results} />;
		}
	};

	render() {
		return (
			<div className="dissence-app-container">
				<DialogQueue dialogs={queue.dialogs} preventOutsideDismiss />
				<div className="dissence-header-container">
					<TopAppBar fixed>
						<TopAppBarRow>
							<TopAppBarSection alignStart>
								<TopAppBarTitle>Dissence</TopAppBarTitle>
								<form onSubmit={this.onSearch}>
									<TextField
										className="dissence-video-search-field"
										outlined
										placeholder="Search video.."
										value={this.state.searchValue}
										onChange={evt =>
											this.setState({ searchValue: evt.target.value })
										}
									/>
								</form>
							</TopAppBarSection>
						</TopAppBarRow>
					</TopAppBar>
					<TopAppBarFixedAdjust />
				</div>
				<div className="dissence-main-container">
					<DissencePlaylist />
					{this.getSearchContent()}
					<DissenceUsersList />
				</div>
				<div className="dissence-footer-container">
					<DissenceControlBar />
				</div>
			</div>
		);
	}
}

export default App;
