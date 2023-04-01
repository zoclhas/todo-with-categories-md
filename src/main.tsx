import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { ActionButtons } from "./components/actions/actions";

import "./styles/main.scss";
import "./styles/dracula-prism.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <ActionButtons />
        <App />
        <Analytics />
    </BrowserRouter>
);
