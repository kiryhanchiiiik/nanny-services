import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import NannieCard from "../../components/NannieCard/NannieCard";
import css from "./FavoritesPage.module.scss";
import { useState } from "react";
import BookingModal from "../../components/BookingModal/BookingModal";

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
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const toggleReadMore = (index: number) => {
    setShowMore((prev) => (prev === index ? null : index));
  };
  return (
    <section>
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
