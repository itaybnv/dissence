import React, { Component } from "react";
import networkController from "./networking/NetworkController";
import searchController from "./controllers/SearchController";
import userController from "./controllers/UsersController";

import DissenceUsersList from "./components/DissenceUsersList";
import DissencePlaylist from "./components/DissencePlaylist";
import DissenceControlBar from "./components/DissenceControlBar";
import DissenceSearchContent from "./components/DissenceSearchContent";

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
import {
	queue,
	nicknameDialog,
	connectionErrorDialog
} from "./components/DissenceDialogQueue";
import playlistController from "./controllers/PlaylistController";
import audioManager from "./audio/AudioManager";

class App extends Component {
	state = {
		searchValue: "",
		searchContentValue: "",
		results: [],
		connected: null,
		nickname: "",
		nicknames: [],
		playlist: [],
		progress: 0
	};

	connectToServer = () =>
		new Promise((resolve, reject) => {
			networkController
				.connect()
				.then(() => audioManager.connect("public"))
				.then(() => {
					this.setState({ connected: true });
					resolve();
				})
				.catch(error => {
					this.setState({ connected: false });
					reject(error);
				});
		});

	onSearch = evt => {
		evt.preventDefault();
		this.setState({ results: [], searchContentValue: this.state.searchValue });
		searchController.ByTitle(this.state.searchValue).then(results => {
			this.setState({ results: results.results });
		});
	};

	registerNicknameHandler = () => {
		userController.registerEventHandler(data => {
			data = JSON.parse(data.toString());
			this.setState({ nicknames: data.nicknames });
		});
	};

	registerPlaylistHandler = () => {
		playlistController.registerEventHandler(data => {
			// If the new playlist's first in queue is different than the old one, reset progress
			if (this.state.playlist && data.playlist) {
				if (this.state.playlist[0] !== data.playlist[0]) {
					this.setState({ progress: 0 });
				}
			}
			data = JSON.parse(data.toString());
			this.setState({ playlist: [...data.playlist] });

			// Set the progress per frame
			// Every frame is 40 miliseconds, divide by the total length
			// of the currently playing, and you get the progress per frame.
			if (this.state.playlist[0]) {
				audioManager.progressPerFrame =
					40 / parseInt(this.state.playlist[0].VideoLength);
			}
		});
	};

	initialActions = () => {
		// Ask for nickname
		nicknameDialog().then(res => {
			// If not skipped, update nickname in server
			if (res) {
				this.setState({ nickname: res });
				userController.updateNickname(res);
			}
		});

		// fetch playlist
		playlistController.getPlaylist().then(res => {
			console.log("res playlist", res);
			this.setState({ playlist: res.playlist });
		});
		// fetch search content
		searchController.ByTitle("").then(results => {
			this.setState({ results: results.results });
		});

		// fetch connected users
		userController
			.getConnectedUsers()
			.then(res => {
				this.setState({ nicknames: res.nicknames });
			})
			.catch(error => {
				console.error(error);
			});

		this.registerNicknameHandler();
		this.registerPlaylistHandler();
	};

	componentDidMount() {
		networkController.registerCloseHandler(() => {
			this.setState({ connected: false });
			connectionErrorDialog().then(res => {
				if (res) {
					// user pressed retry
					this.connectToServer()
						.then(this.initialActions)
						.catch();
				} else {
					// user pressed quit
					const electron = window.require("electron");
					electron.remote.app.quit();
				}
			});
		});
		audioManager.setFrameCallback(() => {
			this.setState({
				progress: this.state.progress + audioManager.progressPerFrame
			});
		});

		this.connectToServer().then(this.initialActions);
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
			return (
				<DissenceSearchContent
					searchResults={this.state.results}
					searchQuery={this.state.searchContentValue}
				/>
			);
		}
	};

	render() {
		if (this.state.connected === null) {
			// not yet connected or not connected
			return <div></div>;
		} else {
			// either connected or not, if not the dialog box will appear
			return (
				<div
					className="dissence-app-container"
					style={{ pointerEvents: this.state.connected ? "" : "none" }}
				>
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
						<DissencePlaylist playlist={this.state.playlist} />
						{this.getSearchContent()}
						<DissenceUsersList
							nicknames={this.state.nicknames}
							nickname={this.state.nickname}
						/>
					</div>
					<div className="dissence-footer-container">
						<DissenceControlBar
							connected={this.state.connected}
							progress={this.state.progress}
						/>
					</div>
				</div>
			);
		}
	}
}

export default App;
