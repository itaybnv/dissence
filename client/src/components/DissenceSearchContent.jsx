import React, { Component } from "react";

import "./DissenceSearchContent.scss";
import DissenceVideoCard from "./DissenceVideoCard";

import { Scrollbars } from "react-custom-scrollbars";

export default class DissenceSearchContent extends Component {
  render() {
    return (
      <div className="dissence-search-content-container">
        <Scrollbars>
          <div className="dissence-search-content">
            <DissenceVideoCard />
            <DissenceVideoCard />
            <DissenceVideoCard />
            <DissenceVideoCard />
            <DissenceVideoCard />
            <DissenceVideoCard />
            <DissenceVideoCard />
            <DissenceVideoCard />
          </div>
        </Scrollbars>
      </div>
    );
  }
}
