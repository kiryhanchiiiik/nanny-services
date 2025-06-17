import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage/HomePage";
import "./App.scss";
import NanniesPage from "./pages/NanniesPage/NanniesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useAuthListener } from "./hooks/useAuthListener";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import Loader from "./components/Loader/Loader";
import { useEffect } from "react";
import { setFavorites } from "./redux/favorites/favoritesSlice";

function App() {
  useAuthListener();
  const dispatch = useDispatch();

  const email = useSelector((state: RootState) => state.auth.user?.email ?? "");
  const isAuthReady = useSelector((state: RootState) => state.auth.isAuthReady);

  useEffect(() => {
    if (email) {
      const savedFavorites = localStorage.getItem(`favorites_${email}`);
      if (savedFavorites) {
        dispatch(setFavorites({ items: JSON.parse(savedFavorites) }));
      }
    }
  }, [email, dispatch]);

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
