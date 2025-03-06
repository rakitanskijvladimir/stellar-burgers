import React from "react";
import "./index.css";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { store } from "./services/global-vault";
import { Provider } from "react-redux";
import App from "./components/layout/core-ui/main-shell";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
