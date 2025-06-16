import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { auth } from "../api/firebase";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user ?? null));
    });

    return () => unsubscribe();
  }, [dispatch]);
};
