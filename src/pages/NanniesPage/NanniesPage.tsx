import css from "./NanniesPage.module.scss";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import NannieCard from "../../components/NannieCard/NannieCard";
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

const NanniesPage = () => {
  const [nannies, setNannies] = useState<Nannie[]>([]);
  const [filteredNannies, setFilteredNannies] = useState<Nannie[]>([]);
  const [selectedNanny, setSelectedNanny] = useState<Nannie | null>(null);
  const [showMore, setShowMore] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchNannies = async () => {
      try {
        const response = await axiosInstance.get("/nannies.json");
        setNannies(response.data);
        setFilteredNannies(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNannies();
  }, []);

  const toggleReadMore = (index: number) => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleFilterChange = (filter: string) => {
    const sorted = [...nannies];

    switch (filter) {
      case "a_to_z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z_to_a":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "less_than_10":
        setFilteredNannies(nannies.filter((n) => n.price_per_hour < 10));
        setVisibleCount(3);
        return;
      case "greater_than_10":
        setFilteredNannies(nannies.filter((n) => n.price_per_hour >= 10));
        setVisibleCount(3);
        return;
      case "popular":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "not_popular":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "show_all":
        setFilteredNannies(nannies);
        setVisibleCount(3);
        return;
      default:
        break;
    }

    setFilteredNannies(sorted);
    setVisibleCount(3);
  };

  return (
    <section className={css.nannies}>
      <Header fullWidth theme="white" />
      <Filters onFilterChange={handleFilterChange} />

      <ul className={css.teacherList}>
        {filteredNannies.slice(0, visibleCount).map((nanny, index) => (
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

      {visibleCount < filteredNannies.length && (
        <div className={css.loadMoreWrapper}>
          <button className={css.loadMoreBtn} onClick={loadMore}>
            Load more
          </button>
        </div>
      )}

      {selectedNanny && (
        <BookingModal
          nanny={selectedNanny}
          onClose={() => setSelectedNanny(null)}
        />
      )}
    </section>
  );
};

export default NanniesPage;
