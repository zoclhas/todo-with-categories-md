import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ActionButtons } from "./components/actions/actions.jsx";
import { Navbar } from "./components/navbar/Navbar";

import "./styles/main.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ActionButtons />
        <Navbar />
        <App />
    </React.StrictMode>
);
