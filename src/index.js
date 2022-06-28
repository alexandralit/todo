import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./components/app";
import "./index.css";

// ReactDom.render(<App />, document.getElementById("root"));

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);

root.render(<App />);