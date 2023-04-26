import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";

import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import { BrowserRouter } from "react-router-dom";

import { Sidebar } from "./components/siderbar/sidebar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <FluentProvider theme={webDarkTheme}>
            <Sidebar />
            <App />
        </FluentProvider>
    </BrowserRouter>
);
