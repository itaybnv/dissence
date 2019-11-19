import React from "react";
import "./App.css";

import DissenceToolbar from "./components/DissenceToolbar";
import DissenceUsersList from "./components/DissenceUsersList";
import DissencePlaylist from "./components/DissencePlaylist";
import DissenceControlBar from "./components/DissenceControlBar";
import DissenceSearchContent from "./components/DissenceSearchContent";

function App() {
  return (
    <div className="dissence-app-container">
      <div className="dissence-header-container">
        <DissenceToolbar />
      </div>

      <div className="dissence-main-container">
        <DissencePlaylist />
        <DissenceSearchContent />
        <DissenceUsersList />
      </div>
      <div className="dissence-footer-container">
        <DissenceControlBar />
      </div>
    </div>
  );
}

export default App;
