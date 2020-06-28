import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ServicesState from "./contexts/ServicesContext/ServicesState";

ReactDOM.render(
  <ServicesState>
    <App />
  </ServicesState>,
  document.getElementById("root")
);

serviceWorker.unregister();
