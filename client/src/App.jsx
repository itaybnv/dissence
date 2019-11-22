import React, { Component } from "react";

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

import "./App.scss";

import searchController from "./controllers/SearchController";

class App extends Component {
	state = { searchValue: "", results: [] };

	onSearch = evt => {
		evt.preventDefault();
		searchController.ByTitle(this.state.searchValue).then(results => {
			this.setState({ results: results.results });
		});
	};

	render() {
		return (
			<div className="dissence-app-container">
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
					<DissenceSearchContent searchResults={this.state.results} />
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
