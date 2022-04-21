import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  createMuiTheme,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@material-ui/core";
import * as serviceWorker from "./serviceWorker";
import { makeServer } from "./Server/server";

const server = makeServer();

// For Warning: findDOMNode is deprecated in StrictMode.
const createTheme =
  process.env.NODE_ENV === "production"
    ? createMuiTheme
    : unstable_createMuiStrictModeTheme;
const theme = createTheme({
  // ...
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
