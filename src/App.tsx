import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage/HomePage";
import "./App.scss";
import NanniesPage from "./pages/NanniesPage/NanniesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useAuthListener } from "./hooks/useAuthListener";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import Loader from "./components/Loader/Loader";

function App() {
  useAuthListener();

  const isAuthReady = useSelector((state: RootState) => state.auth.isAuthReady);

  if (!isAuthReady) return <Loader />;

  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/nannies" element={<NanniesPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <ToastContainer />
    </main>
  );
}

export default App;
