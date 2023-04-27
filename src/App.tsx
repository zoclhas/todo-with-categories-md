import { Routes, Route } from "react-router-dom";

import Home from "./screens/home";
import Category from "./screens/category";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:cat" element={<Category />} />
            </Routes>
        </main>
    );
}

export default App;
