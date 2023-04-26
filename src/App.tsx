import { Routes, Route } from "react-router-dom";

import Home from "./screens/home";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </main>
    );
}

export default App;
