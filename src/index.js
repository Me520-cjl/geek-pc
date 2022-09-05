import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/antd.min.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { HistoryRouter, history } from "./router/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<HistoryRouter history={history}>
		<App />
	</HistoryRouter>
);
