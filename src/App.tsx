import { Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/cat/:name" element={<CategoryScreen />} />
            </Routes>
        </main>
    );
}

export default App;
