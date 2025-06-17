import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

interface Nannie {
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

interface FavoriteState {
  favorites: Nannie[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Nannie>) => {
      const nanny = action.payload;
      const exists = state.favorites.find((fav) => fav.name === nanny.name);
      if (exists) {
        state.favorites = state.favorites.filter(
          (fav) => fav.name !== nanny.name
        );
      } else {
        state.favorites.push(nanny);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
