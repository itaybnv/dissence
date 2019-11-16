import React, { Component } from "react";

import { Fab } from "@rmwc/fab";
//import { Icon } from "@rmwc/icon";
import { Slider } from "@rmwc/slider";
import { LinearProgress } from "@rmwc/linear-progress";

import "./DissenceControlBar.scss";

export default class DissenceControlBar extends Component {
  render() {
    return (
      <div className="dissence-controlbar-container">
        <div className="ghost" style={{ width: "80px" }} />
        <div className="dissence-media-control-container">
          <div className="dissence-media-buttons-container">
            <Fab
              className="dissence-play-button"
              icon="play_circle_filled"
              mini
            />
            <Fab className="dissence-skip-button" icon="skip_next" mini />
          </div>
          <div className="dissence-progress-bar-container">
            <LinearProgress progress={0.1} buffer={0.4}></LinearProgress>
          </div>
        </div>
        <div className="dissence-volume-control-container">
          <Slider></Slider>
        </div>
      </div>
    );
  }
}
