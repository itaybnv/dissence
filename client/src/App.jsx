import React from "react";
import "./App.css";
import { Button } from "@rmwc/button";
import { ThemeProvider } from "@rmwc/theme";

function App() {
  return (
    <ThemeProvider
      options={{
        primary: "#00b0ff",
        secondary: "#212121",
        error: "#ff1744",
        onSurface: "rgba(255,255,255,.87)"
      }}
    >
      <Button raised>Hex</Button>
    </ThemeProvider>
  );
}

export default App;
