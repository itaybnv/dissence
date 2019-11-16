import React, { Component } from "react";
import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from "@rmwc/top-app-bar";

import { TextField } from "@rmwc/textfield";

import "./DissenceToolbar.scss";

export default class DissenceToolbar extends Component {
  render() {
    return (
      <>
        <TopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarTitle>Dissence</TopAppBarTitle>
              <TextField
                className="dissence-video-search-field"
                outlined
                placeholder="Search video.."
              />
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust />
      </>
    );
  }
}
