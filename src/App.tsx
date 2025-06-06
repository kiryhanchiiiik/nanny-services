import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import "./App.scss";
import NanniesPage from "./pages/NanniesPage/NanniesPage";

function App() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/nannies" element={<NanniesPage />}></Route>
      </Routes>
    </main>
  );
}

export default App;
