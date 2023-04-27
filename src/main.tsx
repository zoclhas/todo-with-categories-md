import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import "./styles/prism.css";

import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import { BrowserRouter } from "react-router-dom";

import { Sidebar } from "./components/siderbar/sidebar";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <FluentProvider theme={webDarkTheme}>
            <Sidebar />
            <App />
        </FluentProvider>
    </BrowserRouter>
);
