import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

export interface Nannie {
  about: string;
  avatar_url: string;
  birthday: string;
  characters: string[];
  education: string;
  experience: string;
  kids_age: string;
  location: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Review[];
}

interface FavoritesState {
  items: Nannie[];
}

const saveToLocalStorage = (email: string, items: Nannie[]) => {
  try {
    localStorage.setItem(`favorites_${email}`, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }
};

const initialState: FavoritesState = {
  items: [],
};

interface AddFavoritePayload {
  nanny: Nannie;
  email: string;
}

interface RemoveFavoritePayload {
  nanny: Nannie;
  email: string;
}

interface SetFavoritesPayload {
  items: Nannie[];
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<SetFavoritesPayload>) {
      state.items = action.payload.items;
    },
    clearFavorites(state) {
      state.items = [];
    },
    addFavorite(state, action: PayloadAction<AddFavoritePayload>) {
      const { nanny, email } = action.payload;
      const exists = state.items.find(
        (t) => t.name === nanny.name && t.about === nanny.about
      );
      if (!exists) {
        state.items.push(nanny);
        saveToLocalStorage(email, state.items);
      }
    },
    removeFavorite(state, action: PayloadAction<RemoveFavoritePayload>) {
      const { nanny, email } = action.payload;
      state.items = state.items.filter(
        (t) => !(t.name === nanny.name && t.about === nanny.about)
      );
      saveToLocalStorage(email, state.items);
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
