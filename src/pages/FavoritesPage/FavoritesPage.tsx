import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NannieCard from "../../components/NannieCard/NannieCard";
import BookingModal from "../../components/BookingModal/BookingModal";
import css from "./FavoritesPage.module.scss";
import type { RootState } from "../../redux/store";
import { setFavorites } from "../../redux/favorites/favoritesSlice";

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

const FavoritesPage = () => {
  const [showMore, setShowMore] = useState<number | null>(null);
  const [selectedNanny, setSelectedNanny] = useState<Nannie | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const currentUserEmail = user?.email ?? "";

  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUserEmail) {
      dispatch(setFavorites({ items: [] }));
      return;
    }

    const storedFavorites = localStorage.getItem(
      `favorites_${currentUserEmail}`
    );
    if (storedFavorites) {
      dispatch(setFavorites({ items: JSON.parse(storedFavorites) }));
    } else {
      dispatch(setFavorites({ items: [] }));
    }
  }, [currentUserEmail, dispatch]);

  const toggleReadMore = (index: number) => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  return (
    <section className={css.favorites}>
      <Header fullWidth theme="white" />

      <ul className={css.teacherList}>
        {favorites.map((nanny, index) => (
          <NannieCard
            key={nanny.name}
            nanny={nanny}
            index={index}
            showMore={showMore}
            toggleReadMore={toggleReadMore}
            onBookClick={(nanny) => setSelectedNanny(nanny)}
          />
        ))}
      </ul>

      {selectedNanny && (
        <BookingModal
          nanny={selectedNanny}
          onClose={() => setSelectedNanny(null)}
        />
      )}
    </section>
  );
};

export default FavoritesPage;
