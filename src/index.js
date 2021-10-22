import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "@fontsource/inter";

import "./index.css";

try {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
} catch (error) {
  console.error(error);
}
